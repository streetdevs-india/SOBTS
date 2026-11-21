import { NextResponse } from "next/server";
import { Resend } from "resend";



function sanitize(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      const input = await request.json();
      if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid body");
      body = input;
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    if (body.website) return NextResponse.json({ error: "Unable to submit this enquiry." }, { status: 400 });
    const limits = { name: 120, email: 254, phone: 40, country: 100, productRequirement: 300, message: 5000 };
    for (const [field, limit] of Object.entries(limits)) {
      const value = body[field];
      if (typeof value !== "string" || !value.trim() || value.length > limit) {
        return NextResponse.json({ error: "Please complete all fields with valid details." }, { status: 400 });
      }
    }
    const { name, email, phone, country, productRequirement, message } = Object.fromEntries(
      Object.keys(limits).map((key) => [key, (body[key] as string).trim()])
    );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name + email + productRequirement)) {
      return NextResponse.json({ error: "Please enter valid contact details." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
      return NextResponse.json({ error: "Email is temporarily unavailable. Please contact us by phone or WhatsApp." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeCountry = sanitize(country || "Not specified");
    const safeProduct = sanitize(productRequirement);
    const safeMessage = sanitize(message).replace(/\n/g, "<br>");

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_EMAIL || "info@sobts-exim.com"],
      replyTo: email,
      subject: `New Enquiry from ${name} — ${productRequirement}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #102B50; padding: 28px 32px;">
            <h1 style="margin: 0; color: #F5A000; font-size: 22px; font-weight: 800;">New Customer Enquiry</h1>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Received from sobts.com contact form</p>
          </div>
          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #64717b; font-size: 13px; width: 140px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #102B50; font-size: 14px; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #64717b; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #102B50; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #2b829c;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #64717b; font-size: 13px; vertical-align: top;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #102B50; font-size: 14px;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #64717b; font-size: 13px; vertical-align: top;">Country</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #102B50; font-size: 14px;">${safeCountry}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #64717b; font-size: 13px; vertical-align: top;">Product</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e8e3; color: #102B50; font-size: 14px; font-weight: 600;">${safeProduct}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64717b; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #102B50; font-size: 14px; line-height: 1.6;">${safeMessage}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f4f6f6; padding: 18px 32px; border-top: 2px solid #F5A000;">
            <p style="margin: 0; color: #64717b; font-size: 11px;">This enquiry was submitted through the SOBTS EXIM website contact form. Reply directly to this email to respond to the customer.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend API error:", error);
      return NextResponse.json({ error: "Unable to send your enquiry. Please try WhatsApp or phone." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again." },
      { status: 500 }
    );
  }
}
