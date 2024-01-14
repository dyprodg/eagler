import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

// Initialize a Prisma client
const prisma = new PrismaClient();

// Define authentication options
export const authOptions = {
    providers: [
        // Configure the CredentialsProvider for handling login with email and password
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                // Extract email and password from provided credentials
                const { email, password } = credentials;

                try {
                    // Find a user in the database based on the provided email
                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    // Check if the user doesn't exist or the password doesn't match
                    if (!user || !await bcrypt.compare(password, user.password)) {
                        return null;
                    }

                    return user; // Return the authenticated user
                } catch (error) {
                    console.log('Error:', error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 0,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
    callbacks: {
        // Define callbacks for JWT and session management
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.username = user.username; 
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id; 
            session.user.username = token.username; 
            return session;
        }
    },
};

// Create the authentication handler using NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
