import type { Provider } from "next-auth/providers";

import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";
import Osu from "next-auth/providers/osu";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import client from "@/lib/db";
import {
  EMAIL_FROM,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER,
} from "@/lib/smtp";
import bcrypt from "bcrypt";

const providers: Provider[] = [
  GitHub({
    clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
    clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
  }),
  Osu({
    clientId: process.env.NEXT_PUBLIC_AUTH_AUTH_OSU_ID,
    clientSecret: process.env.NEXT_PUBLIC_AUTH_AUTH_OSU_SECRET,
  }),
  Nodemailer({
    server: {
      host: EMAIL_SERVER_HOST,
      port: EMAIL_SERVER_PORT,
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
    },
    from: EMAIL_FROM,
  }),
  Credentials({
    credentials: {
      emailOrName: {},
      password: {},
    },
    authorize: async (credentials) => {
      if (!credentials?.emailOrName || !credentials?.password) {
        throw new Error("错误的邮箱、用户名或密码");
      }

      const emailOrName = credentials.emailOrName as string;
      let user = await getUserFromDb(emailOrName);

      if (!user) {
        throw new Error("错误的邮箱或用户名");
      }
      const password = credentials.password as string;
      const passwordHash = user.passwordHash;
      const result: boolean = bcrypt.compare(password, passwordHash);

      if (result) return user as User;
      else throw new Error("错误的密码");
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();

      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: providers,
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});

async function getUserFromDb(emailOrName: string) {
  await client.connect();
  const db = client.db("maimap");
  const collection = db.collection("users");
  // Try to find the user by email
  let user = await collection.findOne({ email: emailOrName });

  // If not found, try to find the user by username
  if (!user) {
    user = await collection.findOne({ name: emailOrName });
  }
  user = { ...user, id: user._id.toString() };
  delete user._id;

  return user;
}
