import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      properties,
      total,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // get array data
    const amenities = await formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // get the rest of property data
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: sessionUser.userId,
    };

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert to base64
      const imageBase64 = imageData.toString("base64");

      // make upload request
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // add images to propertyData object
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: "success" }), {
    //   status: 200,
    // });
  } catch (error) {
    return new Response("error adding property", {
      status: 500,
    });
  }
};
