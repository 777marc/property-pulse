import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

console.log(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
