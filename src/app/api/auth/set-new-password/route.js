import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { email, VerifyCode, newPassword } = await req.json();
    
    // Check if there is a user with this email
    const user = await prisma.user.findUnique({
        where: {
        email: email,
        },
    });
    
    if (!user) {
        return NextResponse.json({
        status: 404,
        body: "Email not found",
        });
    }
    
    if (user.emailVerifiedToken !== VerifyCode) {
        return NextResponse.json({
        status: 404,
        body: "Invalid verification code",
        });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedUser = await prisma.user.update({
        where: {
        email: email,
        },
        data: {
        emailVerifiedToken: null,
        auth: {
            update: {
            password: hashedPassword,
            },
        },
        },
    });

    signIn("credentials", {
        email,
        password: newPassword,
        redirect: true,
    });
    
    return NextResponse.json({
        status: 200,
        body: "Password updated successfully",
    });
}