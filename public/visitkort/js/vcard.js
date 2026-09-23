/*
 * vcard.js — bygger en vCard 3.0 der kan importeres af både iOS Kontakter
 * og Android Kontakter.
 *
 * Hvorfor 3.0 og ikke 4.0: iOS' indbyggede parser er markant mere tolerant
 * over for 3.0, og Android understøtter begge. 3.0 er derfor det sikre valg
 * når modtagerens telefon er ukendt.
 */

/** Escaper en værdi jf. RFC 2426 §5. */
function escapeValue(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Folder en linje til maks. 75 oktetter jf. RFC 2426 §2.6.
 * Foldning tæller bytes, ikke tegn — ellers knækker æ/ø/å midt i en UTF-8-sekvens.
 */
function foldLine(line) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;

  const chunks = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    // Ryk tilbage til en gyldig UTF-8-grænse (fortsættelsesbytes er 10xxxxxx).
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    chunks.push(new TextDecoder().decode(bytes.subarray(start, end)));
    start = end;
    limit = 74; // efterfølgende linjer starter med et mellemrum
  }
  return chunks.join('\r\n ');
}

/**
 * @param {object} profile          Felterne fra card.json.
 * @param {object} [options]
 * @param {string} [options.photoBase64]  JPEG/PNG som base64 uden data:-præfiks.
 * @param {string} [options.photoType]    'JPEG' eller 'PNG'.
 * @param {Date}   [options.rev]          Hvornår kortet sidst blev ændret.
 *                                        Udelades feltet, skrives ingen REV-linje.
 * @returns {string} vCard-tekst med CRLF-linjeskift.
 */
export function buildVCard(profile, options = {}) {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];

  const last = profile.lastName || '';
  const first = profile.firstName || '';
  const fullName = [first, last].filter(Boolean).join(' ').trim();

  lines.push(`N:${escapeValue(last)};${escapeValue(first)};;;`);
  lines.push(`FN:${escapeValue(fullName)}`);

  if (profile.company) lines.push(`ORG:${escapeValue(profile.company)}`);
  if (profile.title) lines.push(`TITLE:${escapeValue(profile.title)}`);

  if (profile.phone) {
    // Selve nummeret må ikke escapes — iOS gemmer da backslash i nummeret.
    lines.push(`TEL;TYPE=CELL,VOICE:${profile.phone.replace(/[;,\\]/g, '')}`);
  }
  if (profile.email) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${escapeValue(profile.email)}`);
  }
  if (profile.website) {
    lines.push(`URL:${escapeValue(profile.website)}`);
  }

  if (profile.linkedin) {
    // item-gruppering giver feltet navnet "LinkedIn" i iOS Kontakter.
    // Android ignorerer X-ABLabel og viser det blot som en ekstra URL.
    lines.push(`item1.URL:${escapeValue(profile.linkedin)}`);
    lines.push('item1.X-ABLabel:LinkedIn');
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeValue(profile.linkedin)}`);
  }

  if (profile.tagline) lines.push(`NOTE:${escapeValue(profile.tagline)}`);

  if (options.photoBase64) {
    const type = (options.photoType || 'JPEG').toUpperCase();
    lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${options.photoBase64}`);
  }

  // REV udelades bevidst når ingen dato er angivet. Feltet er valgfrit i
  // vCard 3.0, og en "lige nu"-tidsstempling ville gøre den genererede fil
  // forskellig ved hver kørsel — så kunne man aldrig se om den var opdateret.
  if (options.rev) {
    lines.push(`REV:${options.rev.toISOString().replace(/\.\d{3}/, '')}`);
  }
  lines.push('END:VCARD');

  return lines.map(foldLine).join('\r\n') + '\r\n';
}

/** Filnavn uden mellemrum/specialtegn, f.eks. "eske-hagen.vcf". */
export function vcardFileName(profile) {
  const base = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    // De danske bogstaver skal erstattes FØR NFD-normaliseringen: ellers
    // dekomponeres å til a + ring, ringen fjernes som accent, og navnet
    // ender som "agard" i stedet for "aagaard".
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // øvrige accenter, f.eks. é -> e
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base || 'visitkort'}.vcf`;
}
