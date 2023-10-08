
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.json()
    const data = await resend.emails.send({
        from: "no-reply@bdssbristol.co.uk",
        to: ["rt22190@bristol.ac.uk","bristol.dss2019@gmail.com","thevin.silva@gmail.com"],
        subject: `NAME : ${formData.name} | EMAIL : ${formData.email} `,
        text: formData.text,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}