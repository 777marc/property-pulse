import connectDB from "@/config/database";

export const GET = async (request) => {
  try {
    await connectDB();
    return new Response("DB Connected", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
