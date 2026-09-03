import 'dotenv/config';
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3001;
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? '';
const GMAIL_USER = process.env.GMAIL_USER ?? '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? '';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Simple sanitizer – strips HTML tags to prevent injection in email body
function sanitize(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').trim().slice(0, 2000);
}

// Dato vises som kunden taster den ind i formularen: dd-mm-åååå
function formatDateDk(val: unknown): string {
  const raw = sanitize(val);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : raw;
}

type DetailRow = [string, string];

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  event?: unknown;
  address?: unknown;
  startTime?: unknown;
  endTime?: unknown;
  message?: unknown;
};

/* HTML-escape af én linje – bevarer indholdet i stedet for at fjerne tegn. */
function esc(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val)
    .slice(0, 2000)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Som esc(), men kundens linjeskift bevares som <br> i beskedfeltet. */
function escMulti(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val)
    .slice(0, 4000)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\r\n|\r|\n/g, '<br>');
}

/* Modtagelsestidspunkt i dansk tid: dd-mm-åååå kl. tt:mm */
function receivedStamp(): string {
  const parts = new Intl.DateTimeFormat('da-DK', {
    timeZone: 'Europe/Copenhagen',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')}-${get('month')}-${get('year')} kl. ${get('hour')}:${get('minute')}`;
}

/* Én sektion med overskrift og datarækker. Tomme felter udelades helt,
   så mailen kan videresendes til kunden uden tomme "–"-rækker. */
function detailBlock(title: string, rows: DetailRow[]): string {
  const items = rows.filter((r) => r && r[1]);
  if (items.length === 0) return '';

  const line = 'border-bottom:1px solid rgba(180,71,14,0.14);';

  const rowsHtml = items.map((r, i) => {
    const border = i === items.length - 1 ? '' : line;
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

/* Mailen til ejeren. Den bliver besvaret direkte og dermed delt med kunden,
   så den er bygget som en præsentabel kvittering med logo, links og data. */
function ownerEmailHtml(d: ContactPayload): string {
  const name      = esc(d.name);
  const email     = esc(d.email);
  const phone     = esc(d.phone);
  const dateTxt   = formatDateDk(d.date);
  const eventTxt  = esc(d.event);
  const address   = esc(d.address);
  const startTime = esc(d.startTime);
  const endTime   = esc(d.endTime);
  const message   = escMulti(d.message);
  const timeTxt   = startTime && endTime ? `${startTime} &ndash; ${endTime}` : startTime || endTime;
  const received  = receivedStamp();

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

  return `<!DOCTYPE html>
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
}

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, phone, date, event, address, startTime, endTime, message } = req.body ?? {};

  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safeDate    = formatDateDk(date);
  const safeMessage = sanitize(message);

  // Basic required-field validation
  if (!safeName || !safeEmail || !safeMessage) {
    res.status(400).json({ error: 'Navn, email og besked er påkrævet.' });
    return;
  }

  // Rudimentary email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    res.status(400).json({ error: 'Ugyldig e-mailadresse.' });
    return;
  }

  // ── Mail til ejeren ──────────────────────────────────────────────────────
  const ownerHtml = ownerEmailHtml({ name, email, phone, date, event, address, startTime, endTime, message });

  // ── Bekræftelsesmail til kunden ──────────────────────────────────────────
  const customerHtml = `
<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8" /><style>
  body { font-family: 'Outfit', Arial, sans-serif; background: #080808; color: #ffffff; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid rgba(232,98,26,0.25); }
  .header { background: #e8621a; padding: 28px 32px; }
  .header h1 { margin: 0; font-size: 22px; color: #fff; letter-spacing: 1px; }
  .body { padding: 32px; font-size: 15px; line-height: 1.7; color: #e0d8d0; }
  .highlight { color: #e8621a; font-weight: 600; }
  .footer { padding: 16px 32px; border-top: 1px solid rgba(232,98,26,0.15); font-size: 12px; color: #b0a59d; }
</style></head>
<body>
<div class="wrap">
  <div class="header"><h1>Tak for din henvendelse!</h1></div>
  <div class="body">
    <p>Hej ${safeName},</p>
    <p>Tak fordi du har skrevet til <span class="highlight">EH Events</span>. Din besked er modtaget og jeg vender tilbage hurtigst muligt – typisk inden for 24 timer.</p>
    <p>Har du behov for hurtig kontakt, er du altid velkommen til at ringe eller skrive en SMS direkte til mig på <span class="highlight">+45 50 93 59 52</span>.</p>
    <p>Glæder mig til at høre mere om dit event!</p>
    <p>Med venlig hilsen,<br /><strong>Eske Hagen</strong><br />EH Events</p>
  </div>
  <div class="footer">EH Events · Aarhus · eheventsdk@gmail.com · +45 50 93 59 52</div>
</div>
</body></html>`;

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"EH Events" <${GMAIL_USER}>`,
        to: OWNER_EMAIL,
        replyTo: safeEmail,
        subject: `Ny forespørgsel fra ${safeName}${safeDate ? ' – ' + safeDate : ''}`,
        html: ownerHtml,
      }),
      transporter.sendMail({
        from: `"EH Events" <${GMAIL_USER}>`,
        to: safeEmail,
        subject: 'Tak for din besked – EH Events',
        html: customerHtml,
      }),
    ]);

    res.json({ ok: true });
  } catch (err) {
    console.error('Mail fejl:', err);
    res.status(500).json({ error: 'Mailen kunne ikke sendes. Prøv igen eller kontakt mig direkte.' });
  }
});

app.listen(PORT, () => {
  console.log(`✉  Mail-server kører på http://localhost:${PORT}`);
});
