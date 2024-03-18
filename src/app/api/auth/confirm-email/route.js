import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (token) {
      const user = await prisma.user.findFirst({
        where: { emailVerifiedToken: token },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerifiedToken: null, emailVerified: true },
        });
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/email-verified`);
      } else {
        return NextResponse.json({ message: 'token not found' });
      }
    } else {
      return NextResponse.json({ message: 'token not provided' });
    }
  } catch (error) {
    console.error("An error occurred on email verification:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
};
