import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

import connectMongo from "../../utils/connectMongo";

import Student from "../../models/student";
import { verifyPassword } from "../../utils/auth";

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectMongo();

        const student = await Student.findOne({ email: credentials.email });

        if (!student) {
          throw new Error("Incorrect email or password");
        }

        const isValid = await verifyPassword(
          credentials.password,
          student.password
        );

        if (!isValid) {
          throw new Error("Incorrect email or password");
        }

        return { email: student.email };
      },
    }),
  ],
});
