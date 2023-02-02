import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error });
        }
      }
      break;
    case "POST":
      
      try {
        const product = await Product.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error });
        }
      }
      break;
      case "PUT":
      
      try {
        const product = await Product.findByIdAndUpdate(
          req.body.id
        );
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
