import { NextRequest, NextResponse } from "next/server";
import { generateQRCodeDataURL } from "@/lib/qr";
import { sendTicketEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, qrCode, eventTitle, eventDate, eventTime, venue, quantity } =
      await request.json();

    if (!email || !qrCode || !eventTitle) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const qrDataUrl = await generateQRCodeDataURL(qrCode);

    await sendTicketEmail({
      to: email,
      eventTitle,
      eventDate: eventDate || "",
      eventTime: eventTime || "",
      venue: venue || "",
      quantity: quantity || 1,
      qrCode,
      qrDataUrl,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Door sales email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
