/**
 * NextAuth.js v5 Configuration
 * Handles authentication with credentials and OAuth providers
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectDB, User } from '@/lib/db/models';
import type { UserRole } from '@/types';

// Validation schema for credentials
const credentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }

  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // Email/Password
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials format
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        try {
          await connectDB();

          // Find user with password
          const user = await User.findOne({ email }).select('+hashedPassword');
          if (!user || !user.hashedPassword) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(password, user.hashedPassword);
          if (!isValid) {
            return null;
          }

          // Update last login
          await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Handle JWT token creation
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        token.name = session.user?.name;
        token.image = session.user?.image;
      }

      return token;
    },

    // Handle session creation
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    // Handle OAuth sign in
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();

          // Check if user exists
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user from OAuth
            const newUser = new User({
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              role: 'user',
            });
            existingUser = await newUser.save();
          } else {
            // Update existing user
            await User.findByIdAndUpdate(existingUser._id, {
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
              lastLoginAt: new Date(),
            });
          }

          // Attach role to user object
          user.role = existingUser.role;
          user.id = existingUser._id.toString();

          return true;
        } catch (error) {
          console.error('OAuth sign in error:', error);
          return false;
        }
      }
      return true;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  events: {
    async signOut() {
      // Can add audit logging here
    },
  },

  debug: process.env.NODE_ENV === 'development',
});

/**
 * Get the current session on the server
 */
export const getServerSession = auth;

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Admin role check
 */
export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Moderator or admin role check
 */
export function isModerator(role: UserRole): boolean {
  return role === 'admin' || role === 'moderator';
}

