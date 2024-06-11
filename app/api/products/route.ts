import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/constants"; //if you don't want to use DB instead a constant
import { MongoClient } from "mongodb"; // if You want to use DB

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Connection URI for MongoDB Atlas (replace with your actual connection URI)
  const uri =
    "mongodb+srv://dawar:w9dBds7TOJT9b4S5@merndev.djyjbjd.mongodb.net/";

  // Initialize MongoDB client
  const client = new MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const { searchParams } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("Stripe&NextJs");
    const collection = database.collection("products");

    // Parse and validate limit
    let limit = parseInt(searchParams.get("limit") || "10", 10);
    if (isNaN(limit) || limit < 0) {
      limit = 10; // Default limit value
    }

    // Parse and validate skip
    let skip = parseInt(searchParams.get("skip") || "0", 10);
    if (isNaN(skip) || skip < 0) {
      skip = 0; // Default skip value
    }

    // Fetch products from MongoDB collection
    const total = await collection.countDocuments();
    const cursor = collection.find().skip(skip).limit(limit);
    const products = await cursor.toArray();

    // Map MongoDB _id to id in the payload
    const formattedProducts = products.map((product) => ({
      id: product._id, // Convert MongoDB ObjectId to string
      title: product.title,
      price: product.price,
      description: product.description,
      availabilityStatus: product.availabilityStatus,
    }));

    // Create the response object
    const response = {
      products,
      total,
      skip,
      limit,
    };

    // Return the JSON response
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return an error response if something went wrong
    return NextResponse.error();
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

// export async function GET(req: NextRequest) {

//   const { searchParams } = new URL(req.url);

//   // Parse and validate limit
//   let limit = parseInt(searchParams.get("limit") || "10", 10);
//   if (isNaN(limit) || limit < 0) {
//     limit = 10; // Default limit value
//   }

//   // Parse and validate skip
//   let skip = parseInt(searchParams.get("skip") || "0", 10);
//   if (isNaN(skip) || skip < 0) {
//     skip = 0; // Default skip value
//   }

//   // Calculate the sliced products based on skip and limit
//   const slicedProducts = products.slice(
//     skip,
//     Math.min(skip + limit, products.length)
//   );

//   // Create the response object
//   const response = {
//     products: slicedProducts,
//     total: products.length,
//     skip,
//     limit,
//   };

//   // Return the JSON response
//   return NextResponse.json(response);
// }
