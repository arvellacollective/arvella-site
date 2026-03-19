import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY!)

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

    // ADMIN MAIL
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: "arvellacollective@gmail.com",
      subject: "New Subscriber",
      html: `<p>${email}</p>`,
    })

    // USER MAIL
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: email,
      subject: "Welcome to Arvella",
      html: `<h2>Welcome</h2><p>You are on the list.</p>`,
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