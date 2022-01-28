import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../lib/client";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const existingUser = await client.user.findFirst({
          where: { username: credentials.username },
        });

        if (!existingUser) {
          throw new Error("Invalid credentials");
        }

        const passwordCheck = await compare(
          credentials.password,
          existingUser.passwordHash
        );
        if (!passwordCheck) {
          throw new Error("Invalid credentials");
        }
        return existingUser;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  callbacks: {
    async signIn(user) {
      return user;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
