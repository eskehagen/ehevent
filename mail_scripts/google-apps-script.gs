/**
 * EH Events – Kontaktformular handler
 * Deploy som Web App: Kør som "Mig" / adgang for "Alle"
 */
const SECURITY_TOKEN = 'EH-7291-SECURE-634';
const OWNER_EMAIL    = 'eheventsdk@gmail.com';

function doPost(e) {
  try {
    let data = null;

    if (e && e.postData) {
      try {
        if (e.postData.contents) { data = JSON.parse(e.postData.contents); }
      } catch (err) {}
    }
    if (!data && e && e.parameter && e.parameter.data) {
      try { data = JSON.parse(e.parameter.data); } catch (err) {}
    }

    if (!data) {
      throw new Error('Ugyldigt payload');
    }

    // Token validering
    if (data.token !== SECURITY_TOKEN) {
      throw new Error('Uautoriseret adgang');
    }

    // Honeypot check
    if (data.botField && data.botField.trim() !== '') {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Besked modtaget'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Validering
    if (!data.email || !isValidEmail(data.email)) {
      throw new Error('Ugyldig email: ' + (data.email || 'tom'));
    }
    if (!data.name || data.name.trim() === '') {
      throw new Error('Navn mangler');
    }
    if (!data.message || data.message.trim() === '') {
      throw new Error('Besked mangler');
    }

    // Rate limiting
    const cache = CacheService.getScriptCache();
    const emailKey = 'rate_limit_' + Utilities.base64Encode(data.email);
    if (cache.get(emailKey)) {
      throw new Error('Der er netop sendt en besked fra denne email. Vent venligst 5 minutter.');
    }
    const globalKey = 'global_contact_count';
    let globalCount = parseInt(cache.get(globalKey) || '0');
    if (globalCount >= 30) {
      throw new Error('Systemet har midlertidigt travlt. Prøv igen om lidt.');
    }

    sendToOwner(data);
    sendToCustomer(data);

    cache.put(emailKey, 'true', 300);
    cache.put(globalKey, (globalCount + 1).toString(), 3600);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Besked sendt'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('FEJL: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function s(text) {
  if (!text) return '';
  return text.replace(/[\r\n<>]/g, ' ').trim().slice(0, 2000);
}

/* HTML-escape af én linje – bevarer indholdet i stedet for at fjerne tegn. */
function esc(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .slice(0, 2000)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Som esc(), men kundens linjeskift bevares som <br> i beskedfeltet. */
function escMulti(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .slice(0, 4000)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\r\n|\r|\n/g, '<br>');
}

/* Én sektion med overskrift og datarækker. Tomme felter udelades helt,
   så mailen kan videresendes til kunden uden tomme "–"-rækker. */
function detailBlock(title, rows) {
  const items = rows.filter(function (r) { return r && r[1]; });
  if (items.length === 0) return '';

  const line = 'border-bottom:1px solid rgba(180,71,14,0.14);';

  const rowsHtml = items.map(function (r, i) {
    const border = (i === items.length - 1) ? '' : line;
    return `
              <tr>
                <td style="padding:13px 0;${border}width:96px;vertical-align:top;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6b5f56;line-height:1.9;">${r[0]}</td>
                <td style="padding:13px 0 13px 18px;${border}vertical-align:top;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;color:#1a1512;line-height:1.5;">${r[1]}</td>
              </tr>`;
  }).join('');

  return `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
              <tr>
                <td style="padding-bottom:12px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:22px;height:1px;background:#e8621a;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</td>
                      <td style="padding-left:10px;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#b4470e;vertical-align:middle;">${title}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#f2ece6;border:1px solid rgba(180,71,14,0.16);padding:4px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}
                  </table>
                </td>
              </tr>
            </table>`;
}

function sendToOwner(d) {
  const name      = esc(d.name);
  const email     = esc(d.email);
  const phone     = esc(d.phone);
  const dateTxt   = formatDateDk(d.date);
  const eventTxt  = esc(d.event);
  const address   = esc(d.address);
  const startTime = esc(d.startTime);
  const endTime   = esc(d.endTime);
  const message   = escMulti(d.message);
  const timeTxt   = (startTime && endTime) ? startTime + ' &ndash; ' + endTime : (startTime || endTime);
  const received  = Utilities.formatDate(new Date(), 'Europe/Copenhagen', "dd-MM-yyyy 'kl.' HH:mm");

  const subject = 'Ny forespørgsel fra ' + s(d.name) + (d.date ? ' – ' + formatDateDk(d.date) : '');

  const contactBlock = detailBlock('Kontakt', [
    ['Navn',    name],
    ['Email',   email ? `<a href="mailto:${email}" style="color:#b4470e;text-decoration:none;">${email}</a>` : ''],
    ['Telefon', phone ? `<a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color:#b4470e;text-decoration:none;">${phone}</a>` : ''],
  ]);

  const eventBlock = detailBlock('Event', [
    ['Dato',      dateTxt],
    ['Eventtype', eventTxt],
    ['Adresse',   address],
    ['Tidspunkt', timeTxt],
  ]);

  const preheader = [name, eventTxt, dateTxt].filter(Boolean).join(' · ');

  const html = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <style>:root{color-scheme:light;supported-color-schemes:light;}</style>
</head>
<body style="margin:0;padding:0;background-color:#faf7f4;">

<!-- Preview-tekst i indbakken -->
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf7f4;opacity:0;">${preheader}</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf7f4;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid rgba(180,71,14,0.2);box-shadow:0 18px 44px rgba(26,21,18,0.10);">

        <!-- Orange topkant -->
        <tr>
          <td style="height:3px;background-color:#e8621a;background:linear-gradient(90deg,#e8621a 0%,#f07d35 50%,rgba(232,98,26,0.1) 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Brand header -->
        <tr>
          <td style="padding:30px 40px 26px;border-bottom:1px solid rgba(180,71,14,0.14);">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:54px;vertical-align:middle;">
                  <img src="https://eskehagenevents.dk/images/eh-logo-512.png" width="54" height="54" alt="EH Events" style="display:block;width:54px;height:54px;border:0;outline:none;text-decoration:none;">
                </td>
                <td style="padding-left:16px;vertical-align:middle;">
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-style:italic;color:#1a1512;line-height:1.15;">Eske Hagen</div>
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-style:italic;color:#b4470e;line-height:1.15;">Events</div>
                </td>
                <td align="right" style="vertical-align:middle;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6b5f56;line-height:1.9;">
                  DJ &amp; Eventudstyr<br>Aarhus
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Overskrift -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:28px;height:1px;background:#e8621a;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</td>
                <td style="padding-left:10px;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#b4470e;vertical-align:middle;">Ny henvendelse</td>
              </tr>
            </table>
            <div style="margin-top:18px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:40px;font-weight:400;font-style:italic;color:#1a1512;line-height:1.1;display:block;">Booking</span>
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:40px;font-weight:400;font-style:italic;color:#b4470e;line-height:1.1;display:block;">forespørgsel</span>
            </div>
            <p style="margin:18px 0 0;font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:1.7;color:#6b5f56;">Modtaget via kontaktformularen på eskehagenevents.dk<br>${received}</p>
          </td>
        </tr>

        <!-- Detaljer -->
        <tr>
          <td style="padding:0 40px;">
            ${contactBlock}
            ${eventBlock}

            <!-- Besked -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
              <tr>
                <td style="padding-bottom:12px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:22px;height:1px;background:#e8621a;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</td>
                      <td style="padding-left:10px;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#b4470e;vertical-align:middle;">Besked</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:3px;background:#e8621a;font-size:0;line-height:0;">&nbsp;</td>
                      <td style="background:#f2ece6;padding:20px 24px;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.8;color:#1a1512;">${message}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Signatur -->
        <tr>
          <td style="padding:36px 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="height:1px;background:rgba(180,71,14,0.18);font-size:0;line-height:0;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;line-height:1.75;color:#6b5f56;">Med venlig hilsen,</p>
            <p style="margin:6px 0 2px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;color:#1a1512;">Eske Hagen</p>
            <p style="margin:0 0 20px;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#b4470e;">EH Events</p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="tel:+4550935952" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#b4470e;text-decoration:none;letter-spacing:0.05em;">&#9742;&nbsp; +45 50 93 59 52</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="mailto:eheventsdk@gmail.com" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#b4470e;text-decoration:none;letter-spacing:0.05em;">&#9993;&nbsp; eheventsdk@gmail.com</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 40px 26px;border-top:1px solid rgba(180,71,14,0.14);background:#f2ece6;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:top;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#1a1512;">Eske Hagen</span><span style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#b4470e;"> Events</span>
                  <br>
                  <span style="font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#6b5f56;letter-spacing:0.08em;">Aarhus &middot; CVR 46389344</span>
                </td>
                <td align="right" style="vertical-align:top;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;line-height:1.9;letter-spacing:0.06em;">
                  <a href="https://eskehagenevents.dk" style="color:#b4470e;text-decoration:none;">eskehagenevents.dk</a>
                  <br>
                  <a href="https://www.instagram.com/ehevents.dk/" style="color:#b4470e;text-decoration:none;">Instagram &middot; @ehevents.dk</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- end card -->

    </td>
  </tr>
</table>
</body></html>`;

  GmailApp.sendEmail(OWNER_EMAIL, subject, '', {
    htmlBody: html,
    replyTo: s(d.email)
  });
}

function sendToCustomer(d) {
  const subject = 'Tak for din besked – EH Events';

  const dateDisplay = s(d.date) ? formatDate(s(d.date)) : null;
  const timeDisplay = (s(d.startTime) && s(d.endTime)) ? s(d.startTime) + ' – ' + s(d.endTime) : null;

  const detailRows = [
    d.event    ? ['Eventtype', s(d.event)]   : null,
    dateDisplay ? ['Dato',      dateDisplay]   : null,
    timeDisplay ? ['Tidspunkt', timeDisplay]   : null,
    d.address  ? ['Adresse',   s(d.address)]  : null,
  ].filter(Boolean);

  const detailsHtml = detailRows.length > 0 ? `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
      ${detailRows.map(([label, val]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(232,98,26,0.12);width:110px;vertical-align:top;">
          <span style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b0a59d;font-family:'Segoe UI',Arial,sans-serif;">${label}</span>
        </td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(232,98,26,0.12);vertical-align:top;">
          <span style="font-size:14px;color:#ffffff;font-family:'Segoe UI',Arial,sans-serif;">${val}</span>
        </td>
      </tr>`).join('')}
    </table>` : '';

  const html = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#080808;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080808;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#0f0f0f;border:1px solid rgba(232,98,26,0.2);">

        <!-- Orange top bar -->
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,#e8621a 0%,#f07d35 50%,rgba(232,98,26,0.1) 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="padding:48px 48px 40px;border-bottom:1px solid rgba(232,98,26,0.12);">
            <!-- Eyebrow label -->
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:28px;height:1px;background:#e8621a;vertical-align:middle;">&nbsp;</td>
                <td style="padding-left:10px;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#e8621a;vertical-align:middle;">Bekræftelse</td>
              </tr>
            </table>
            <!-- Main heading -->
            <div style="margin-top:20px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:400;font-style:italic;color:#ffffff;line-height:1.1;display:block;">Tak for din</span>
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:400;font-style:italic;color:#e8621a;line-height:1.1;display:block;">henvendelse</span>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 48px;">
            <!-- Greeting -->
            <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;color:#ffffff;">Hej ${s(d.name)},</p>
            <p style="margin:0 0 20px;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.75;color:#b0a59d;">Din besked er modtaget og jeg vender tilbage hurtigst muligt &ndash; typisk inden for 24 timer.</p>
            <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.75;color:#b0a59d;">Glæder mig til at høre mere om dit event og finde den helt rigtige løsning til dig.</p>

            <!-- Detail rows (only shown if any fields were filled) -->
            ${detailsHtml}

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:36px 0;">
              <tr>
                <td style="height:1px;background:rgba(232,98,26,0.15);font-size:0;line-height:0;">&nbsp;</td>
              </tr>
            </table>

            <!-- Quote / highlight block -->
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="width:3px;background:#e8621a;">&nbsp;</td>
                <td style="padding:4px 0 4px 20px;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-style:italic;font-weight:400;color:#ffffff;line-height:1.5;">Har du brug for hurtig kontakt, er du altid velkommen til at ringe eller skrive en SMS til mig direkte.</span>
                </td>
              </tr>
            </table>

            <!-- Contact links -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td style="padding-bottom:10px;">
                  <a href="tel:+4550935952" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#e8621a;text-decoration:none;letter-spacing:0.05em;">&#9742;&nbsp; +45 50 93 59 52</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="mailto:eheventsdk@gmail.com" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#e8621a;text-decoration:none;letter-spacing:0.05em;">&#9993;&nbsp; eheventsdk@gmail.com</a>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:36px 0 32px;">
              <tr>
                <td style="height:1px;background:rgba(232,98,26,0.15);font-size:0;line-height:0;">&nbsp;</td>
              </tr>
            </table>

            <!-- Signature -->
            <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#b0a59d;line-height:1.6;">Med venlig hilsen,</p>
            <p style="margin:6px 0 2px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;color:#ffffff;">Eske Hagen</p>
            <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#e8621a;">EH Events</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 48px;border-top:1px solid rgba(232,98,26,0.12);">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#ffffff;">EH</span><span style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#e8621a;"> Events</span>
                  <br>
                  <a href="https://eskehagenevents.dk" style="font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#e8621a;text-decoration:none;letter-spacing:0.06em;">eskehagenevents.dk</a>
                </td>
                <td align="right" style="vertical-align:bottom;">
                  <span style="font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#b0a59d;letter-spacing:0.08em;">Aarhus &middot; CVR: 46389344</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- end card -->

    </td>
  </tr>
</table>
</body></html>`;

  GmailApp.sendEmail(s(d.email), subject, '', {
    htmlBody: html
  });
}

function formatDate(iso) {
  try {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const months = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];
    return parseInt(parts[2]) + '. ' + months[parseInt(parts[1]) - 1] + ' ' + parts[0];
  } catch(e) {
    return iso;
  }
}

// Dato som kunden taster den ind i formularen: dd-mm-åååå
function formatDateDk(iso) {
  const raw = s(iso);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  return m ? m[3] + '-' + m[2] + '-' + m[1] : raw;
}
