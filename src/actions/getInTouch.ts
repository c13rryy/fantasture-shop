"use server";

import MessageTemplate from "@/components/Templates/MessageTemplate/MessageTemplate";
import { validateEmail } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  userName: z.string().min(2, {
    message: "Not a valid name",
  }),
  userEmail: z.string().refine(value => validateEmail(value), {
    message: "Not a valid email",
  }),
  userMessage: z.string().min(5, {
    message: "Not a valid message",
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getInTouch(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    userEmail: formData.get("userEmail"),
    userName: formData.get("userName"),
    userMessage: formData.get("userMessage"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { userEmail, userName, userMessage } = validatedFields.data;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kyrulenakivan@gmail.com",
      subject: "From fantasture-shop",
      reply_to: userEmail,
      react: React.createElement(MessageTemplate, {
        userName,
        userMessage,
      }),
    });
  } catch (error) {
    return {
      errors: "Something went wrong",
    };
  }
}
