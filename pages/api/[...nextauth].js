import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

import connectMongo from "../../../utils/connectMongo";

import Educator from "../../../models/educator";
import { verifyPassword } from "../../../utils/auth";

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectMongo();

        const educator = await Educator.findOne({ email: credentials.email });

        if (!educator) {
          throw new Error("No new User");
        }

        const isValid = await verifyPassword(
          credentials.password,
          educator.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        return { email: educator.email };
      },
    }),
  ],
});
