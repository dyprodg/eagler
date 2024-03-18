import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Initialize a Prisma client
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the request JSON to get username, email, and password
    const { username, email, password } = await req.json();

    // Check if email and username are provided
    if (!email || !username) {
      return NextResponse.json({
        status: 409,
        message: "Email and Username are required",
      });
    }

    // Check if an existing user with the same email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 409,
        message: "E-Mail or Username are already taken",
      });
    }

    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    const confirmationToken = crypto.randomBytes(64).toString('hex');

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        auth: {
          create: { password: hashedPassword },
        },
        emailVerifiedToken: confirmationToken,
      },
    });

    // Setup the email transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.eu-west-1.awsapps.com",
      port: 465,
      secure: true,
      auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Setup the email options
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the link: ${process.env.NEXTAUTH_URL}/api/auth/confirm-email?token=${confirmationToken}`
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    // Return a success response
    return NextResponse.json({
      status: 201,
      message: "Account creation successful",
    });
  } catch (error) {
    // Handle errors and return an error response
    console.error("An error occurred", error);
    return NextResponse.json({ message: "An error occurred" });
  } finally {
    // Disconnect from the Prisma client after processing
    await prisma.$disconnect();
  }
}
