import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    let isBookmarked = User.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
    }

    await User.save();

    return new Response(JSON.stringify(message, isBookmarked), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("error adding bookmark", {
      status: 500,
    });
  }
};