import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || !body.email || !body.message || !body.name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const name = String(body.name).trim()
    const email = String(body.email).trim()
    const message = String(body.message).trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("ENV ERROR: Missing RESEND_API_KEY")
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

    const adminHtml = `
      <div style="background:#f4f2ef;padding:40px 20px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:30px;color:#1a1a1a;">
          <p style="font-size:10px;letter-spacing:0.2em;color:#999;text-align:center;margin-bottom:20px;">
            CONTACT FORM
          </p>

          <h2 style="text-align:center;font-weight:500;margin-bottom:20px;">
            New Contact Message
          </h2>

          <p><strong>Name:</strong><br /> ${safeName}</p>
          <p><strong>Email:</strong><br /> ${safeEmail}</p>

          <div style="margin-top:20px;padding:16px;border:1px solid #eee;background:#fafafa;">
            <p><strong>Message</strong></p>
            <p style="white-space:normal;">${safeMessage}</p>
          </div>
        </div>
      </div>
    `

    const userHtml = `
      <div style="background:#f4f2ef;padding:80px 20px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;text-align:center;color:#1a1a1a;">
          <div style="letter-spacing:0.5em;font-size:12px;margin-bottom:50px;">
            ARVELLA
          </div>

          <h2 style="font-size:22px;font-weight:400;margin-bottom:24px;">
            Your message has been received.
          </h2>

          <p style="font-size:14px;line-height:1.8;color:#666;margin-bottom:40px;">
            We’ve received your message.<br />
            Our team will respond shortly.
          </p>

          <div style="margin:40px 0;padding:20px;border:1px solid #eaeaea;background:#fafafa;text-align:left;">
            <p style="font-size:11px;letter-spacing:0.15em;color:#999;margin-bottom:10px;">
              YOUR MESSAGE
            </p>

            <p style="font-size:14px;line-height:1.6;color:#1a1a1a;white-space:normal;">
              ${safeMessage}
            </p>
          </div>

          <a
            href="https://arvellacollective.com"
            style="
              display:inline-block;
              padding:12px 32px;
              border:1px solid #1a1a1a;
              text-decoration:none;
              color:#1a1a1a;
              font-size:11px;
              letter-spacing:0.25em;
            "
          >
            VISIT ARVELLA
          </a>

          <p style="margin-top:60px;font-size:11px;color:#aaa;">
            Arvella Collective<br />
            Quiet Power
          </p>
        </div>
      </div>
    `

    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from: "Arvella Contact <contact@arvellacollective.com>",
        to: ["arvellacollective@gmail.com"],
        replyTo: email,
        subject: `[CONTACT] ${name}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Arvella <contact@arvellacollective.com>",
        to: [email],
        replyTo: "arvellacollective@gmail.com",
        subject: "We received your message — Arvella",
        html: userHtml,
      }),
    ])

    if (adminResult.error) {
      console.error("RESEND ADMIN MAIL ERROR:", adminResult.error)
      return NextResponse.json(
        { error: "Failed to send admin email" },
        { status: 500 }
      )
    }

    if (userResult.error) {
      console.error("RESEND USER MAIL ERROR:", userResult.error)
      return NextResponse.json(
        { error: "Failed to send auto-reply email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("CONTACT API ERROR:", err)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}