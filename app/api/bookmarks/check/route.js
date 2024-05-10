import connectDB from "@/config/database";
import User from "@/models/User";
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

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
      isBookmarked: isBookmarked,
    });
  } catch (error) {
    console.log(error);
    return new Response("error adding bookmark", {
      status: 500,
    });
  }
};
