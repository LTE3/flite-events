import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export async function sendTicketEmail({
  to,
  eventTitle,
  eventDate,
  eventTime,
  venue,
  quantity,
  qrCode,
  qrDataUrl,
}: {
  to: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  quantity: number;
  qrCode: string;
  qrDataUrl: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "PulseTix <tickets@pulsetix.ai>",
    to,
    subject: `Your Tickets: ${eventTitle}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#000;font-family:'Inter',Arial,sans-serif;color:#fff;">
  <div style="max-width:500px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#E0A832;margin:0;">PULSETIX</h1>
    </div>

    <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;margin-bottom:24px;">
      <h2 style="font-size:20px;font-weight:800;margin:0 0 4px;">You're In! 🎉</h2>
      <p style="color:#999;font-size:14px;margin:0 0 20px;">Your tickets are confirmed.</p>

      <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;">
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px;">${eventTitle}</h3>
        <p style="color:#999;font-size:14px;margin:4px 0;">📅 ${eventDate} • ${eventTime}</p>
        <p style="color:#999;font-size:14px;margin:4px 0;">📍 ${venue}</p>
        <p style="color:#999;font-size:14px;margin:4px 0;">🎫 ${quantity} ticket${quantity > 1 ? "s" : ""}</p>
      </div>
    </div>

    <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="font-size:14px;font-weight:600;margin:0 0 16px;">Your QR Code</p>
      <img src="${qrDataUrl}" alt="QR Code" style="width:200px;height:200px;border-radius:8px;" />
      <p style="color:#999;font-size:12px;margin:12px 0 0;">Show this at the door for entry</p>
      <p style="color:#555;font-size:11px;margin:8px 0 0;">Code: ${qrCode.slice(0, 12)}...</p>
    </div>

    <p style="color:#555;font-size:12px;text-align:center;">
      Questions? Contact us at Pulsetixai@gmail.com
    </p>
    <p style="color:#333;font-size:11px;text-align:center;margin-top:20px;">
      © ${new Date().getFullYear()} PulseTix. All rights reserved.
    </p>
  </div>
</body>
</html>`,
  });
}
