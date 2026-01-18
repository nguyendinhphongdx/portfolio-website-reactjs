import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

/**
 * Generate a unique username from email
 */
async function generateUsername(email: string): Promise<string> {
  const localPart = email.split("@")[0];
  const baseUsername = localPart
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20);

  const existingUser = await prisma.user.findUnique({
    where: { username: baseUsername },
  });

  if (!existingUser) {
    return baseUsername;
  }

  // Generate unique suffix
  let attempts = 0;
  while (attempts < 10) {
    const suffix = Math.random().toString(36).slice(2, 6);
    const newUsername = `${baseUsername.slice(0, 16)}${suffix}`;

    const exists = await prisma.user.findUnique({
      where: { username: newUsername },
    });

    if (!exists) {
      return newUsername;
    }
    attempts++;
  }

  return `${baseUsername.slice(0, 12)}${Date.now().toString(36)}`;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      // For OAuth providers, create or update user in database
      if (account?.provider === "google" || account?.provider === "github") {
        if (!user.email) return false;

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create new user for OAuth with generated username
            const username = await generateUsername(user.email);
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                username,
                name: user.name || "",
                password: "", // No password for OAuth users
                portfolio: {
                  create: {
                    template: "minimal",
                    primaryColor: "#3b82f6",
                    fullName: user.name,
                    email: user.email,
                  },
                },
              },
            });
            user.id = newUser.id;
          } else {
            // Update username if missing (for existing OAuth users)
            if (!existingUser.username) {
              const username = await generateUsername(user.email);
              await prisma.user.update({
                where: { id: existingUser.id },
                data: { username },
              });
            }
            user.id = existingUser.id;
          }
        } catch (error) {
          console.error("OAuth sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // For OAuth providers, we need to get the database user ID
      // because user.id from OAuth might be the provider's ID
      if (account && (account.provider === "google" || account.provider === "github")) {
        // Lookup user by email to get database ID
        if (user?.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
          }
        }
        token.provider = account.provider;
      } else if (user) {
        // For credentials login, user.id is already the database ID
        token.id = user.id;
      }
      if (account && !token.provider) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
