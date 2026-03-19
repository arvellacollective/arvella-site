import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || !body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const email = body.email as string

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("ENV ERROR: Missing RESEND_API_KEY")
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    // 1️⃣ USER MAIL
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: email,
      subject: "You're in — Arvella",
      html: `
      <div style="background:#f4f2ef;padding:60px 20px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;text-align:center;color:#1a1a1a;">
          
          <h1 style="letter-spacing:0.4em;font-size:14px;margin-bottom:40px;">
            ARVELLA
          </h1>

          <h2 style="font-size:22px;font-weight:500;margin-bottom:20px;">
            You’re now inside the frequency.
          </h2>

          <p style="font-size:14px;line-height:1.6;color:#666;margin-bottom:40px;">
            This is not just a list.<br/>
            This is a different level of presence.
          </p>

          <a href="https://arvellacollective.com/shop"
            style="
              display:inline-block;
              padding:12px 28px;
              border:1px solid #1a1a1a;
              text-decoration:none;
              color:#1a1a1a;
              font-size:12px;
              letter-spacing:0.2em;
            "
          >
            ENTER SHOP
          </a>

          <p style="margin-top:50px;font-size:11px;color:#999;">
            Arvella Collective<br/>
            Minimal frequency-driven apparel
          </p>

        </div>
      </div>
      `,
    })

    // 2️⃣ ADMIN NOTIFICATION (SANA)
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: "arvellacollective@gmail.com",
      subject: "New Subscriber",
      text: `New subscriber: ${email}`,
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("API ERROR:", err)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}