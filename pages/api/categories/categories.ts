import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/category";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data:categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      
      try {
        const category = await Category.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: category });
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
