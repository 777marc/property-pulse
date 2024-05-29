import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;
    const { id } = params;

    const existingMessages = await Message.findById(id);

    if (!existingMessages) {
      return new Response("Message not found.", { status: 404 });
    }

    // verify ownership
    if (existingMessages.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const messageData = {
      read: !existingMessages.read,
    };

    //update message
    await Message.findByIdAndUpdate(id, messageData);

    return new Response(JSON.stringify(messageData), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("error adding property", {
      status: 500,
    });
  }
};
