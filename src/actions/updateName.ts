"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, {
    message: "Not a valid name",
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateName(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    const session = await getAuthSession();

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    });

    if (username) {
      return {
        errors: "Username is taken",
      };
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        username: name,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    return {
      errors: "Something went wrong",
    };
  }
}
