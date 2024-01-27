import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// Initialize a Prisma client
const prisma = new PrismaClient();


export async function POST(req) {
    try {
        // Parse the request JSON to get username, email, and password
        const { username, email, password } = await req.json();

        // Check if email and username are provided
        if (!email || !username) {
            return NextResponse.json({ status: 409, message: 'Email and Username are required' });
        }

        // Check if an existing user with the same email or username already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ status: 409, message: 'E-Mail or Username are already taken' });
        }

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                username,
                email,
                auth: {
                    create: { password: hashedPassword }
                }
            }
        });

        // Return a success response
        return NextResponse.json({ status: 201, message: 'Account creation successful' });
    } catch (error) {
        // Handle errors and return an error response
        console.error('An error occurred', error);
        return NextResponse.json({ message: 'An error occurred' });
    } finally {
        // Disconnect from the Prisma client after processing
        await prisma.$disconnect();
    }
}
