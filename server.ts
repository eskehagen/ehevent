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

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, phone, date, event, address, startTime, endTime, message } = req.body ?? {};

  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safePhone   = sanitize(phone);
  const safeDate    = sanitize(date);
  const safeEvent   = sanitize(event);
  const safeAddress = sanitize(address);
  const safeStart   = sanitize(startTime);
  const safeEnd     = sanitize(endTime);
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
  const ownerHtml = `
<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8" /><style>
  body { font-family: 'Outfit', Arial, sans-serif; background: #080808; color: #ffffff; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid rgba(232,98,26,0.25); }
  .header { background: #e8621a; padding: 28px 32px; }
  .header h1 { margin: 0; font-size: 22px; color: #fff; letter-spacing: 1px; }
  .body { padding: 32px; }
  .row { margin-bottom: 16px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #b0a59d; margin-bottom: 4px; }
  .value { font-size: 15px; color: #ffffff; }
  .message-box { background: #1c1c1c; border-left: 3px solid #e8621a; padding: 16px; margin-top: 8px; white-space: pre-wrap; font-size: 15px; color: #fff; }
  .footer { padding: 16px 32px; border-top: 1px solid rgba(232,98,26,0.15); font-size: 12px; color: #b0a59d; }
</style></head>
<body>
<div class="wrap">
  <div class="header"><h1>Ny bookingforespørgsel – EH Events</h1></div>
  <div class="body">
    <div class="row"><div class="label">Navn</div><div class="value">${safeName}</div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${safeEmail}" style="color:#e8621a">${safeEmail}</a></div></div>
    <div class="row"><div class="label">Telefon</div><div class="value">${safePhone || '–'}</div></div>
    <div class="row"><div class="label">Dato</div><div class="value">${safeDate || '–'}</div></div>
    <div class="row"><div class="label">Eventtype</div><div class="value">${safeEvent || '–'}</div></div>
    <div class="row"><div class="label">Adresse</div><div class="value">${safeAddress || '–'}</div></div>
    <div class="row"><div class="label">Tidspunkt</div><div class="value">${safeStart || '–'} → ${safeEnd || '–'}</div></div>
    <div class="row"><div class="label">Besked</div><div class="message-box">${safeMessage}</div></div>
  </div>
  <div class="footer">Sendt via kontaktformularen på eheventsdj.dk</div>
</div>
</body></html>`;

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
  <div class="footer">EH Events · Aarhus · eskehagen@gmail.com · +45 50 93 59 52</div>
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
