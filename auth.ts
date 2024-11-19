import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GitHub({
      clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});
