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

    // 🔥 PREMIUM ADMIN MAIL (UPGRADED)
    const adminHtml = `
      <div style="
        background:#f4f2ef;
        padding:32px 16px;
        font-family:Helvetica,Arial,sans-serif;
      ">
        <div style="
          max-width:520px;
          margin:0 auto;
          background:#ffffff;
          padding:32px 28px;
          color:#1a1a1a;
        ">
          
          <div style="text-align:center;margin-bottom:26px;">
            <p style="
              font-size:10px;
              letter-spacing:0.4em;
              color:#aaa;
              margin-bottom:10px;
            ">
              ARVELLA CONTACT
            </p>

            <div style="
              width:40px;
              height:1px;
              background:#e5e5e5;
              margin:0 auto 14px auto;
            "></div>

            <h2 style="
              font-weight:500;
              letter-spacing:-0.02em;
              margin:0;
            ">
              New Contact Inquiry
            </h2>
          </div>

          <div style="margin-bottom:24px;">
            
            <div style="margin-bottom:16px;">
              <p style="
                font-size:10px;
                letter-spacing:0.25em;
                color:#999;
                margin-bottom:4px;
              ">
                NAME
              </p>
              <p style="
                margin:0;
                font-size:15px;
                font-weight:500;
              ">
                ${safeName}
              </p>
            </div>

            <div>
              <p style="
                font-size:10px;
                letter-spacing:0.25em;
                color:#999;
                margin-bottom:4px;
              ">
                EMAIL
              </p>
              <p style="
                margin:0;
                font-size:14px;
              ">
                <a href="mailto:${safeEmail}" style="color:#1a1a1a;text-decoration:none;">
                  ${safeEmail}
                </a>
              </p>
            </div>

          </div>

          <div style="
            padding:20px 18px;
            border:1px solid rgba(0,0,0,0.05);
            background:#fafafa;
          ">
            <p style="
              font-size:10px;
              letter-spacing:0.3em;
              color:#aaa;
              margin-bottom:10px;
            ">
              MESSAGE
            </p>

            <p style="
              margin:0;
              font-size:15px;
              line-height:1.9;
              color:#1a1a1a;
              letter-spacing:0.01em;
              word-break:break-word;
            ">
              ${safeMessage}
            </p>
          </div>

        </div>
      </div>
    `

    // 🔥 USER MAIL (CLIPPING FIXED)
    const userHtml = `
      <div style="background: radial-gradient(circle at 50% 0%, #f5f3f1 0%, #e9e6e2 100%);padding:50px 16px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;text-align:center;color:#1a1a1a;">
          
          <div style="letter-spacing:0.4em;font-size:12px;margin-bottom:40px;opacity:0.7;">
            ARVELLA
          </div>

          <h2 style="font-size:24px;font-weight:500;margin-bottom:16px;letter-spacing:-0.02em;">
            Message Received.
          </h2>

          <p style="font-size:14px;line-height:1.7;color:#666;margin-bottom:30px;opacity:0.85;">
            We’ll review your message and respond with intention.
          </p>

          <div style="margin:30px 0 10px 0;padding:26px 24px;border:1px solid rgba(0,0,0,0.08);background:rgba(255,255,255,0.6);text-align:left;">
            
            <p style="
              font-size:10px;
              letter-spacing:0.3em;
              color:#999;
              margin-bottom:14px;
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
              word-break:break-word;
            ">
              ${safeMessage}
            </p>

          </div>

          <p style="margin-top:20px;font-size:12px;color:#888;font-style:italic;opacity:0.8;">
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
              margin-top:30px;
            "
          >
            EXPLORE ARVELLA
          </a>

          <p style="margin-top:40px;font-size:11px;color:#999;opacity:0.6;letter-spacing:0.2em;">
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