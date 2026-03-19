import { NextResponse } from "next/server"
import { Resend } from "resend"

// 🔥 KRİTİK FIX
export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      )
    }

    // ADMIN MAIL
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: "arvellacollective@gmail.com",
      subject: "New Subscriber",
      html: `<p>New subscriber: ${email}</p>`,
    })

    // USER MAIL
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: email,
      subject: "Welcome to Arvella",
      html: `
        <h2>Welcome to Arvella</h2>
        <p>You are now on the list.</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}