import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const { email } = await req.json();
    

    // Check if there is a user with this email
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return NextResponse.json({
            status: 404,
            body: 'Email not found',
        });
    }
    const randomCode = String(Math.floor(Math.random() * 900000)).padStart(6, '0');
    if (user) {
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerifiedToken: randomCode,
            },
        });
    }

    
    // Send email with nodemailer
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.eu-west-1.awsapps.com",
            port: 465,
            secure: true,
            auth:{
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${randomCode}`
          }

          await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`Email sent: ${info.response}`);
            }
          });

        return NextResponse.json({
            status: 200,
            body: 'Confirmation email sent',
        });
    } catch (error) {
        return NextResponse.json({
            status: 405,
            body: 'Failed to send confirmation email',
        });
    }
}