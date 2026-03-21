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
      <div style="background: radial-gradient(circle at 50% 0%, #f5f3f1 0%, #e9e6e2 100%);padding:80px 20px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;text-align:center;color:#1a1a1a;">
          
          <div style="letter-spacing:0.4em;font-size:12px;margin-bottom:50px;opacity:0.7;">
            ARVELLA
          </div>

          <h2 style="font-size:24px;font-weight:500;margin-bottom:18px;letter-spacing:-0.02em;">
            Message Received.
          </h2>

          <p style="font-size:14px;line-height:1.7;color:#666;margin-bottom:40px;opacity:0.85;">
            We’ll review your message and respond with intention.
          </p>

          <div style="margin:50px 0 20px 0;padding:28px 26px;border:1px solid rgba(0,0,0,0.08);background:rgba(255,255,255,0.6);text-align:left;">
            
            <p style="
              font-size:10px;
              letter-spacing:0.3em;
              color:#999;
              margin-bottom:16px;
            ">
              YOUR MESSAGE
            </p>

            <p style="
              font-size:15px;
              line-height:1.8;
              color:#1a1a1a;
              font-style:italic;
              opacity:0.85;
              margin:0;
            ">
              ${safeMessage}
            </p>

          </div>

          <p style="margin-top:25px;font-size:12px;color:#888;font-style:italic;opacity:0.8;">
            Every message is read with care.
          </p>

          <a
            href="https://arvellacollective.com"
            style="
              display:inline-block;
              padding:14px 36px;
              border:1px solid #1a1a1a;
              text-decoration:none;
              color:#1a1a1a;
              font-size:11px;
              letter-spacing:0.25em;
              margin-top:40px;
            "
          >
            EXPLORE ARVELLA
          </a>

          <p style="margin-top:60px;font-size:11px;color:#999;opacity:0.6;letter-spacing:0.2em;">
            ARVELLA COLLECTIVE<br />
            Quiet Power, Always.
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
        replyTo: "contact@arvellacollective.com",
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