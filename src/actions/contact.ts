"use server";

import React from "react";
import { Resend } from "resend";
import ContactEmail from "../emails/ContactEmail";
import { error } from "console";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendContactEmail(formdata: FormData) {
  const senderEmail = formdata.get("senderEmail") as string;
  const message = formdata.get("message") as string;
  if (!senderEmail || !message) {
    return { error: "Email and message are required." };
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "pbelwal761@gmail.com",
      subject: "New Message from NextCart Contact Form",
      react: React.createElement(ContactEmail, {
        senderEmail: senderEmail,
        message: message,
      }),
    });

    if (data.error) {
      return { error: data.error.message };
    }
    return { success: "Message sent successfully" };
    redirect("/");
  } catch (error) {
    console.error(error);
  }
}
