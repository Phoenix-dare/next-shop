import NextAuth, { AuthOptions, Session, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/users";
import bcrypt from "bcrypt";

import { MongoClient } from "mongodb";


interface ExtendedAuthOptions extends AuthOptions {
  session: {
    strategy: SessionStrategy;
    user?:Session["user"]
  } & AuthOptions["session"];
}

export const authOptions: ExtendedAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, _req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const user = await User.findOne({ username });
        const passwordCorrect =
          user === null ? false : await bcrypt.compare(password, user.password);
        if (!(user && passwordCorrect)) {
          return null;
        }

        return user.toJSON() as any;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({
      token,
      user,
    }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as Session["user"];
      return session;
    },
  },
};

export default NextAuth(authOptions);
