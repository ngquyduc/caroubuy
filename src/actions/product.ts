import connectToDB from "@/lib/mongoose";
import Product from "../../model/Product";

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find({});

    return products;
  } catch (error) {
    console.error(error);
  }
}
