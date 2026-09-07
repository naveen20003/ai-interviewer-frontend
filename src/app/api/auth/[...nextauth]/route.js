import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import api from "@/lib/api";

const handler = NextAuth({

  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    {
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",

      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "openid profile email"
        }
      },

      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken"
      },

      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo"
      },

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        };
      }
    }
  ],

  callbacks: {

  async signIn() {
    return true;
  },

  async jwt({ token, account }) {

    if (account) {
      token.provider = account.provider;
      token.providerAccountId =
        account.providerAccountId;
    }

    return token;
  },

  async session({ session, token }) {

    session.provider =
      token.provider;

    session.providerAccountId =
      token.providerAccountId;

    return session;
  }
}
});

export {
  handler as GET,
  handler as POST
};