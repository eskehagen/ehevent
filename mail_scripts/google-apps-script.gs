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

  const html = `<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#080808;color:#fff;margin:0;padding:0}
  .wrap{max-width:600px;margin:40px auto;background:#141414;border:1px solid rgba(232,98,26,.25)}
  .hd{background:#e8621a;padding:28px 32px}
  .hd h1{margin:0;font-size:22px;color:#fff;letter-spacing:1px}
  .bd{padding:32px;font-size:15px;line-height:1.7;color:#e0d8d0}
  .hl{color:#e8621a;font-weight:600}
  .ft{padding:16px 32px;border-top:1px solid rgba(232,98,26,.15);font-size:12px;color:#b0a59d}
</style></head>
<body>
<div class="wrap">
  <div class="hd"><h1>Tak for din henvendelse!</h1></div>
  <div class="bd">
    <p>Hej ${s(d.name)},</p>
    <p>Tak fordi du har skrevet til <span class="hl">EH Events</span>. Din besked er modtaget og jeg vender tilbage hurtigst muligt – typisk inden for 24 timer.</p>
    <p>Har du behov for hurtig kontakt, er du altid velkommen til at ringe eller skrive en SMS direkte til mig på <span class="hl">+45 50 93 59 52</span>.</p>
    <p>Glæder mig til at høre mere om dit event!</p>
    <p>Med venlig hilsen,<br><strong>Eske Hagen</strong><br>EH Events</p>
  </div>
  <div class="ft">EH Events · Aarhus · eskehagen@gmail.com · +45 50 93 59 52</div>
</div>
</body></html>`;

  GmailApp.sendEmail(s(d.email), subject, '', {
    htmlBody: html
  });
}
