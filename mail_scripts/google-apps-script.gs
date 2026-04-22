/**
 * EH Events – Kontaktformular handler
 * Deploy som Web App: Kør som "Mig" / adgang for "Alle"
 */
const SECURITY_TOKEN = 'EH-7291-SECURE-634';
const OWNER_EMAIL    = 'eskehagen@gmail.com';

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

function sendToOwner(d) {
  const subject = 'Ny forespørgsel fra ' + s(d.name) + (d.date ? ' – ' + s(d.date) : '');

  const html = `<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#080808;color:#fff;margin:0;padding:0}
  .wrap{max-width:600px;margin:40px auto;background:#141414;border:1px solid rgba(232,98,26,.25)}
  .hd{background:#e8621a;padding:28px 32px}
  .hd h1{margin:0;font-size:22px;color:#fff;letter-spacing:1px}
  .bd{padding:32px}
  .row{margin-bottom:16px}
  .lbl{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#b0a59d;margin-bottom:4px}
  .val{font-size:15px;color:#fff}
  .msg{background:#1c1c1c;border-left:3px solid #e8621a;padding:16px;margin-top:8px;white-space:pre-wrap;font-size:15px;color:#fff}
  .ft{padding:16px 32px;border-top:1px solid rgba(232,98,26,.15);font-size:12px;color:#b0a59d}
</style></head>
<body>
<div class="wrap">
  <div class="hd"><h1>Ny bookingforespørgsel – EH Events</h1></div>
  <div class="bd">
    <div class="row"><div class="lbl">Navn</div><div class="val">${s(d.name)}</div></div>
    <div class="row"><div class="lbl">Email</div><div class="val"><a href="mailto:${s(d.email)}" style="color:#e8621a">${s(d.email)}</a></div></div>
    <div class="row"><div class="lbl">Telefon</div><div class="val">${s(d.phone) || '–'}</div></div>
    <div class="row"><div class="lbl">Dato</div><div class="val">${s(d.date) || '–'}</div></div>
    <div class="row"><div class="lbl">Eventtype</div><div class="val">${s(d.event) || '–'}</div></div>
    <div class="row"><div class="lbl">Adresse</div><div class="val">${s(d.address) || '–'}</div></div>
    <div class="row"><div class="lbl">Tidspunkt</div><div class="val">${s(d.startTime) || '–'} → ${s(d.endTime) || '–'}</div></div>
    <div class="row"><div class="lbl">Besked</div><div class="msg">${s(d.message)}</div></div>
  </div>
  <div class="ft">Sendt via kontaktformularen på EH Events</div>
</div>
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
                  <a href="mailto:eskehagen@gmail.com" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#e8621a;text-decoration:none;letter-spacing:0.05em;">&#9993;&nbsp; eskehagen@gmail.com</a>
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
