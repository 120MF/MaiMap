import type { Provider } from "next-auth/providers";

import NextAuth from "next-auth";
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
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      emailOrName: {},
      password: {},
    },
    authorize: async (credentials) => {
      return null;
      // let user = null
      //
      // // logic to salt and hash password
      // const pwHash = saltAndHashPassword(credentials.password)
      //
      // // logic to verify if the user exists
      // user = await getUserFromDb(credentials.email, pwHash)
      //
      // if (!user) {
      //   // No user found, so this is their first attempt to login
      //   // Optionally, this is also the place you could do a user registration
      //   throw new Error("Invalid credentials.")
      // }
      //
      // // return user object with their profile data
      // return user
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
});
