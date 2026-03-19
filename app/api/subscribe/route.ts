import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // sana mail
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: "arvellacollective@gmail.com",
      subject: "New Subscriber",
      text: `New subscriber: ${email}`,
    });

    // kullanıcıya mail
    await resend.emails.send({
      from: "Arvella <info@arvellacollective.com>",
      to: email,
      subject: "Welcome to Arvella",
      html: `<h2>Welcome</h2><p>You are on the list.</p>`,
    });

    return NextResponse.json({ status: "success" });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}