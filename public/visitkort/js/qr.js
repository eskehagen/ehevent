/*
 * qr.js — minimal, dependency-free QR Code encoder (ISO/IEC 18004), byte mode.
 *
 * Bruges både af websiden og af tools/. Ingen netværk, ingen build-step:
 * modulmatrixen beregnes lokalt, så QR-koden også virker offline.
 *
 * encode(text, { ecLevel, minVersion, maxVersion }) -> { size, modules }
 *   modules[y][x] === true betyder "sort modul".
 */

const ECC_CODEWORDS_PER_BLOCK = {
  L: [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  M: [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  Q: [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  H: [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
};

const NUM_EC_BLOCKS = {
  L: [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  M: [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  Q: [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  H: [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
};

const ECL_FORMAT_BITS = { L: 1, M: 0, Q: 3, H: 2 };

/* ---------- GF(256) ---------- */

function gfMultiply(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z & 0xff;
}

function rsGeneratorPoly(degree) {
  const result = new Uint8Array(degree);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMultiply(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = gfMultiply(root, 0x02);
  }
  return result;
}

function rsRemainder(data, generator) {
  const degree = generator.length;
  const result = new Uint8Array(degree);
  for (const b of data) {
    const factor = b ^ result[0];
    result.copyWithin(0, 1);
    result[degree - 1] = 0;
    for (let i = 0; i < degree; i++) result[i] ^= gfMultiply(generator[i], factor);
  }
  return result;
}

/* ---------- geometri ---------- */

/** Antal datamoduler (dvs. ikke-funktionsmoduler) for en given version. */
function rawDataModules(version) {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const numAlign = Math.floor(version / 7) + 2;
    result -= (25 * numAlign - 10) * numAlign - 55;
    if (version >= 7) result -= 36;
  }
  return result;
}

function dataCodewords(version, ecLevel) {
  return (
    Math.floor(rawDataModules(version) / 8) -
    ECC_CODEWORDS_PER_BLOCK[ecLevel][version] * NUM_EC_BLOCKS[ecLevel][version]
  );
}

function alignmentPositions(version) {
  if (version === 1) return [];
  const numAlign = Math.floor(version / 7) + 2;
  const step =
    version === 32 ? 26 : Math.ceil((version * 4 + 4) / (numAlign * 2 - 2)) * 2;
  const result = [6];
  for (let pos = version * 4 + 10; result.length < numAlign; pos -= step) {
    result.splice(1, 0, pos);
  }
  return result;
}

/* ---------- bitbuffer ---------- */

class BitBuffer {
  constructor() {
    this.bits = [];
  }
  append(value, length) {
    for (let i = length - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  }
  get length() {
    return this.bits.length;
  }
}

/* ---------- matrix ---------- */

class Matrix {
  constructor(version) {
    this.version = version;
    this.size = version * 4 + 17;
    this.modules = Array.from({ length: this.size }, () =>
      new Array(this.size).fill(false)
    );
    this.isFunction = Array.from({ length: this.size }, () =>
      new Array(this.size).fill(false)
    );
  }

  set(x, y, dark, isFunction = true) {
    this.modules[y][x] = dark;
    if (isFunction) this.isFunction[y][x] = true;
  }

  drawFinder(cx, cy) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        const x = cx + dx;
        const y = cy + dy;
        if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
          this.set(x, y, dist !== 2 && dist !== 4);
        }
      }
    }
  }

  drawAlignment(cx, cy) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }

  drawFunctionPatterns(ecLevel) {
    // Timing patterns
    for (let i = 0; i < this.size; i++) {
      this.set(6, i, i % 2 === 0);
      this.set(i, 6, i % 2 === 0);
    }

    // Finder patterns med separatorer
    this.drawFinder(3, 3);
    this.drawFinder(this.size - 4, 3);
    this.drawFinder(3, this.size - 4);

    // Alignment patterns
    const positions = alignmentPositions(this.version);
    const n = positions.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const skipCorner =
          (i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0);
        if (!skipCorner) this.drawAlignment(positions[i], positions[j]);
      }
    }

    // Reserver plads til format- og versionsinformation
    this.drawFormatBits(ecLevel, 0);
    this.drawVersionBits();
  }

  drawFormatBits(ecLevel, mask) {
    const data = (ECL_FORMAT_BITS[ecLevel] << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412;

    const bitAt = (i) => ((bits >>> i) & 1) === 1;

    // Øverste venstre hjørne
    for (let i = 0; i <= 5; i++) this.set(8, i, bitAt(i));
    this.set(8, 7, bitAt(6));
    this.set(8, 8, bitAt(7));
    this.set(7, 8, bitAt(8));
    for (let i = 9; i < 15; i++) this.set(14 - i, 8, bitAt(i));

    // Øverste højre og nederste venstre
    for (let i = 0; i < 8; i++) this.set(this.size - 1 - i, 8, bitAt(i));
    for (let i = 8; i < 15; i++) this.set(8, this.size - 15 + i, bitAt(i));
    this.set(8, this.size - 8, true); // altid sort modul
  }

  drawVersionBits() {
    if (this.version < 7) return;
    let rem = this.version;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const bits = (this.version << 12) | rem;

    for (let i = 0; i < 18; i++) {
      const dark = ((bits >>> i) & 1) === 1;
      const a = this.size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      this.set(a, b, dark);
      this.set(b, a, dark);
    }
  }

  drawCodewords(data) {
    let i = 0;
    for (let right = this.size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < this.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = ((right + 1) & 2) === 0;
          const y = upward ? this.size - 1 - vert : vert;
          if (!this.isFunction[y][x] && i < data.length * 8) {
            this.modules[y][x] = ((data[i >>> 3] >>> (7 - (i & 7))) & 1) === 1;
            i++;
          }
        }
      }
    }
  }

  applyMask(mask) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.isFunction[y][x]) continue;
        let invert;
        switch (mask) {
          case 0: invert = (x + y) % 2 === 0; break;
          case 1: invert = y % 2 === 0; break;
          case 2: invert = x % 3 === 0; break;
          case 3: invert = (x + y) % 3 === 0; break;
          case 4: invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break;
          case 5: invert = ((x * y) % 2) + ((x * y) % 3) === 0; break;
          case 6: invert = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0; break;
          case 7: invert = (((x + y) % 2) + ((x * y) % 3)) % 2 === 0; break;
          default: throw new RangeError('Ugyldig maske');
        }
        if (invert) this.modules[y][x] = !this.modules[y][x];
      }
    }
  }

  penaltyScore() {
    const N1 = 3, N2 = 3, N3 = 40, N4 = 10;
    const size = this.size;
    const m = this.modules;
    let result = 0;

    // Regel 1: sammenhængende løb på 5+ moduler i samme farve, vandret og lodret.
    for (let i = 0; i < size; i++) {
      let rowColor = m[i][0], rowRun = 1;
      let colColor = m[0][i], colRun = 1;
      for (let j = 1; j < size; j++) {
        if (m[i][j] === rowColor) rowRun++;
        else { if (rowRun >= 5) result += N1 + (rowRun - 5); rowColor = m[i][j]; rowRun = 1; }
        if (m[j][i] === colColor) colRun++;
        else { if (colRun >= 5) result += N1 + (colRun - 5); colColor = m[j][i]; colRun = 1; }
      }
      if (rowRun >= 5) result += N1 + (rowRun - 5);
      if (colRun >= 5) result += N1 + (colRun - 5);
    }

    // Regel 2: 2x2-blokke i samme farve.
    for (let y = 0; y < size - 1; y++) {
      for (let x = 0; x < size - 1; x++) {
        const c = m[y][x];
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) result += N2;
      }
    }

    // Regel 3: finder-lignende mønster 1:1:3:1:1 med fire lyse moduler ved siden af.
    const A = [true, false, true, true, true, false, true, false, false, false, false];
    const B = [false, false, false, false, true, false, true, true, true, false, true];
    const matches = (get) => {
      let hits = 0;
      for (let i = 0; i + 11 <= size; i++) {
        let okA = true, okB = true;
        for (let k = 0; k < 11; k++) {
          const v = get(i + k);
          if (v !== A[k]) okA = false;
          if (v !== B[k]) okB = false;
          if (!okA && !okB) break;
        }
        if (okA) hits++;
        if (okB) hits++;
      }
      return hits;
    };
    for (let i = 0; i < size; i++) {
      result += matches((j) => m[i][j]) * N3;
      result += matches((j) => m[j][i]) * N3;
    }

    // Regel 4: afvigelse fra 50 % sorte moduler.
    //
    // ISO/IEC 18004 beskriver det som: rund andelen ned og op til nærmeste
    // multiplum af 5, træk 50 fra begge, divider med 5 og tag den mindste.
    // Det svarer præcis til floor(|andel - 50| / 5). Nogle udbredte
    // biblioteker afrunder anderledes og lander derfor lejlighedsvis på en
    // anden maske; begge giver gyldige koder, men her følges standarden.
    let dark = 0;
    for (const row of m) for (const cell of row) if (cell) dark++;
    const total = size * size;
    const ratio = (dark * 100) / total;
    result += Math.floor(Math.abs(ratio - 50) / 5) * N4;

    return result;
  }
}

/* ---------- hovedfunktion ---------- */

/**
 * @param {string} text            Indholdet (UTF-8).
 * @param {object} [options]
 * @param {'L'|'M'|'Q'|'H'} [options.ecLevel='M']
 * @param {number} [options.minVersion=1]
 * @param {number} [options.maxVersion=40]
 * @param {number} [options.forceMask]  Lås masken fast (kun til afprøvning).
 * @returns {{ size:number, version:number, ecLevel:string, mask:number,
 *             penalty:number, modules:boolean[][] }}
 */
export function encode(text, options = {}) {
  const ecLevel = options.ecLevel || 'M';
  const minVersion = options.minVersion || 1;
  const maxVersion = options.maxVersion || 40;
  if (!ECC_CODEWORDS_PER_BLOCK[ecLevel]) throw new RangeError('Ugyldigt EC-niveau');

  const bytes = new TextEncoder().encode(text);

  // Find mindste version der kan rumme data
  let version = minVersion;
  for (; ; version++) {
    if (version > maxVersion) {
      throw new RangeError(
        `Teksten er for lang til en QR-kode (${bytes.length} bytes, niveau ${ecLevel})`
      );
    }
    const charCountBits = version < 10 ? 8 : 16;
    const needed = 4 + charCountBits + bytes.length * 8;
    if (needed <= dataCodewords(version, ecLevel) * 8) break;
  }

  const capacityBits = dataCodewords(version, ecLevel) * 8;
  const bb = new BitBuffer();
  bb.append(0b0100, 4); // byte mode
  bb.append(bytes.length, version < 10 ? 8 : 16);
  for (const b of bytes) bb.append(b, 8);

  // Terminator + padding til hel byte
  bb.append(0, Math.min(4, capacityBits - bb.length));
  bb.append(0, (8 - (bb.length % 8)) % 8);

  // Udfyldningsbytes
  for (let pad = 0xec; bb.length < capacityBits; pad ^= 0xec ^ 0x11) bb.append(pad, 8);

  const dataBytes = new Uint8Array(bb.length / 8);
  bb.bits.forEach((bit, i) => {
    dataBytes[i >>> 3] |= bit << (7 - (i & 7));
  });

  const codewords = addEccAndInterleave(dataBytes, version, ecLevel);

  const matrix = new Matrix(version);
  matrix.drawFunctionPatterns(ecLevel);
  matrix.drawCodewords(codewords);

  // Vælg masken med lavest strafpoint
  let bestMask = 0;
  let minPenalty = Infinity;
  // forceMask er til afprøvning: den gør udfaldet forudsigeligt, så
  // modulplaceringen kan sammenlignes direkte med et andet bibliotek.
  if (options.forceMask !== undefined) {
    matrix.applyMask(options.forceMask);
    matrix.drawFormatBits(ecLevel, options.forceMask);
    return {
      size: matrix.size,
      version,
      ecLevel,
      mask: options.forceMask,
      penalty: matrix.penaltyScore(),
      modules: matrix.modules,
    };
  }

  for (let mask = 0; mask < 8; mask++) {
    matrix.applyMask(mask);
    matrix.drawFormatBits(ecLevel, mask);
    const penalty = matrix.penaltyScore();
    if (penalty < minPenalty) {
      minPenalty = penalty;
      bestMask = mask;
    }
    matrix.applyMask(mask); // fortryd (XOR er sin egen invers)
  }
  matrix.applyMask(bestMask);
  matrix.drawFormatBits(ecLevel, bestMask);

  return {
    size: matrix.size,
    version,
    ecLevel,
    mask: bestMask,
    penalty: minPenalty,
    modules: matrix.modules,
  };
}

function addEccAndInterleave(data, version, ecLevel) {
  const numBlocks = NUM_EC_BLOCKS[ecLevel][version];
  const blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecLevel][version];
  const rawCodewords = Math.floor(rawDataModules(version) / 8);
  const numShortBlocks = numBlocks - (rawCodewords % numBlocks);
  const shortBlockLen = Math.floor(rawCodewords / numBlocks);

  const blocks = [];
  const generator = rsGeneratorPoly(blockEccLen);
  for (let i = 0, k = 0; i < numBlocks; i++) {
    const datLen = shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1);
    const dat = data.subarray(k, k + datLen);
    k += datLen;
    blocks.push({ dat, ecc: rsRemainder(dat, generator) });
  }

  // Interleave: først databytes kolonnevis, derefter EC-bytes kolonnevis
  const result = new Uint8Array(rawCodewords);
  let idx = 0;
  const maxDatLen = shortBlockLen - blockEccLen + 1;
  for (let i = 0; i < maxDatLen; i++) {
    for (const block of blocks) {
      if (i < block.dat.length) result[idx++] = block.dat[i];
    }
  }
  for (let i = 0; i < blockEccLen; i++) {
    for (const block of blocks) result[idx++] = block.ecc[i];
  }
  return result;
}

/** Tegner QR-koden som en SVG-streng. */
export function toSvg(text, options = {}) {
  const { size, modules } = encode(text, options);
  const border = options.border ?? 2;
  const dim = size + border * 2;
  const dark = options.dark || '#000000';
  const light = options.light || '#ffffff';

  const parts = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules[y][x]) parts.push(`M${x + border},${y + border}h1v1h-1z`);
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges">`,
    `<rect width="${dim}" height="${dim}" fill="${light}"/>`,
    `<path d="${parts.join('')}" fill="${dark}"/>`,
    `</svg>`,
  ].join('');
}
