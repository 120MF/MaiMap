import type { Provider } from "next-auth/providers";

import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";
import Osu from "next-auth/providers/osu";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import client from "@/lib/db";
import {
  EMAIL_FROM,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER,
} from "@/lib/smtp";

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
        return { error: "错误的邮箱、用户名或密码" } as User;
      }

      const emailOrName = credentials.emailOrName as string;
      let user = await getUserFromDb(emailOrName);

      if (!user) {
        return { error: "错误的邮箱或用户名" } as User;
      }
      const password = credentials.password as string;
      const passwordHash = user.passwordHash;
      const result: boolean = bcrypt.compare(password, passwordHash);

      if (result) return user as User;
      else return { error: "错误的密码" } as User;
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
      //@ts-ignore
      if (user?.error ?? false)
        //@ts-ignore
        return { error: user?.error ?? "undefined error" };
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async signIn({ user }) {
      //@ts-ignore
      if (user?.error ?? false) {
        //@ts-ignore
        throw new Error(user?.error);
      }
      if (user?.email) {
        await migrateReview(user);
      }

      return true;
    },

    async session({ session, token }) {
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
  let user = await collection.findOne({ email: emailOrName });

  if (!user) {
    user = await collection.findOne({ name: emailOrName });
  }
  if (!user) return null;
  user = { ...user, id: user._id.toString() };
  delete user._id;

  return user;
}

async function migrateReview(user: User) {
  await client.connect();
  const db = client.db("maimap");
  let collection = db.collection("users");

  try {
    let dataBaseUser = await collection.findOne({ _id: new ObjectId(user.id) });

    if (dataBaseUser?.reviewMigrated) return;

    collection = db.collection("reviews");
    await collection.updateMany(
      { email: user.email },
      { $set: { user_id: new ObjectId(user.id) } },
    );

    collection = db.collection("users");

    await collection.updateOne(
      { _id: new ObjectId(user.id) },
      { $set: { reviewMigrated: true } },
    );
  } catch (error) {
    throw error;
  }
}
