import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invokes on successful sign in
    async signIn({ profile }) {
      const { email, name, picture: image } = profile;

      // 1. Connect to DB
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email });
      // 3. If not, then add user to DB
      if (!userExists) {
        const username = name.slice(0, 20);

        await User.create({
          email,
          username,
          image,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modify session object
    async session({ session }) {
      // 1. Get user from DB
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user to the session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};
