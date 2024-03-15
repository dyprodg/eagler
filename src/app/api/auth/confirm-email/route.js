import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const GET = async(req) => {
  const url = new URL(req.url);
  const token = new URLSearchParams(url.searchParams).get('token');

  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifiedToken: token,
      },
    });
    if(!user) {
      return NextResponse.rewrite('/404').status(404).text("Token not found");
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerifiedToken: null,
        emailVerified: true,
      },
    });

    return NextResponse.redirect("/email-verified");

  } catch (error) { 
    console.log(error);
    return NextResponse.redirect('/error');
  }

};