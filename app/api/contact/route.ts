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
    const reason = String(body.reason || "").trim()
    const details = String(body.details || "").trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")
    const safeReason = escapeHtml(reason)
    const safeDetails = escapeHtml(details)

    const subjectPrefix =
      safeReason === "Other" && safeDetails
        ? `Other: ${safeDetails}`
        : safeReason || "General"

    // ADMIN MAIL
    const adminHtml = `
      <div style="background:#f4f2ef;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:32px 28px;color:#1a1a1a;">
          
          <div style="text-align:center;margin-bottom:26px;">
            <p style="font-size:10px;letter-spacing:0.4em;color:#aaa;margin-bottom:10px;">
              ARVELLA CONTACT
            </p>

            <div style="width:40px;height:1px;background:#e5e5e5;margin:0 auto 14px auto;"></div>

            <h2 style="font-weight:500;margin:0;">
              New Contact Inquiry
            </h2>
          </div>

          <div style="margin-bottom:24px;">

            <div style="margin-bottom:16px;">
              <p style="font-size:10px;letter-spacing:0.25em;color:#999;margin-bottom:4px;">REASON</p>
              <p style="margin:0;font-size:14px;">${safeReason || "—"}</p>
            </div>

            ${
              safeReason === "Other" && safeDetails
                ? `
            <div style="margin-bottom:16px;">
              <p style="font-size:10px;letter-spacing:0.25em;color:#999;margin-bottom:4px;">DETAILS</p>
              <p style="margin:0;font-size:14px;">${safeDetails}</p>
            </div>
            `
                : ""
            }

            <div style="margin-bottom:16px;">
              <p style="font-size:10px;letter-spacing:0.25em;color:#999;margin-bottom:4px;">NAME</p>
              <p style="margin:0;font-size:15px;font-weight:500;">${safeName}</p>
            </div>

            <div>
              <p style="font-size:10px;letter-spacing:0.25em;color:#999;margin-bottom:4px;">EMAIL</p>
              <p style="margin:0;font-size:14px;">
                <a href="mailto:${safeEmail}" style="color:#1a1a1a;text-decoration:none;">
                  ${safeEmail}
                </a>
              </p>
            </div>

          </div>

          <div style="padding:20px 18px;border:1px solid rgba(0,0,0,0.05);background:#fafafa;">
            <p style="font-size:10px;letter-spacing:0.3em;color:#aaa;margin-bottom:10px;">
              MESSAGE
            </p>

            <p style="margin:0;font-size:15px;line-height:1.9;color:#1a1a1a;">
              ${safeMessage}
            </p>
          </div>

        </div>
      </div>
    `

    // USER MAIL
    const userHtml = `
      <div style="background:#f5f3f1;padding:60px 16px;font-family:Helvetica,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;text-align:center;color:#1a1a1a;">
          
          <div style="letter-spacing:0.45em;font-size:11px;margin-bottom:48px;opacity:0.6;">
            ARVELLA
          </div>

          <h2 style="font-size:24px;font-weight:500;margin-bottom:16px;">
            Message Received
          </h2>

          <p style="font-size:14px;color:#666;margin-bottom:28px;line-height:1.7;">
            Thank you for reaching out.  
            Your message has been received and will be reviewed with care.
          </p>

          <a
            href="https://arvellacollective.com"
            style="
              display:inline-block;
              padding:14px 34px;
              border:1px solid #1a1a1a;
              text-decoration:none;
              color:#1a1a1a;
              font-size:11px;
              letter-spacing:0.25em;
              margin-bottom:30px;
            "
          >
            VISIT WEBSITE
          </a>

          ${
            safeReason
              ? `
          <p style="font-size:11px;color:#888;margin-bottom:24px;letter-spacing:0.08em;">
            Regarding: ${
              safeReason === "Other" && safeDetails
                ? safeDetails
                : safeReason
            }
          </p>
          `
              : ""
          }

          <div style="
            margin:30px 0;
            padding:28px 26px;
            border:1px solid rgba(0,0,0,0.06);
            background:rgba(255,255,255,0.7);
            text-align:left;
          ">
            
            <p style="font-size:10px;letter-spacing:0.3em;color:#999;margin-bottom:14px;">
              YOUR MESSAGE
            </p>

            <p style="font-size:15px;line-height:1.9;margin:0;color:#1a1a1a;">
              ${safeMessage}
            </p>

          </div>

          <p style="margin-top:20px;font-size:10px;color:#aaa;letter-spacing:0.2em;">
            © ${new Date().getFullYear()} ARVELLA COLLECTIVE
          </p>

        </div>
      </div>
    `

    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from: "Arvella Contact <contact@arvellacollective.com>",
        to: ["arvellacollective@gmail.com"],
        replyTo: email,
        subject: `[${subjectPrefix}] New Message — Arvella`,
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

    if (adminResult.error || userResult.error) {
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}