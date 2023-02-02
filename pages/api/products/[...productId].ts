import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { method } = req;
  await dbConnect();
  const productId = req.query.productId;
  let id: any;
  
  if (Array.isArray(productId) && productId.length >= 2) {
    id = productId[1];
  } else {
    id = undefined;
    
    res.status(400).json({ success:false,error: 'Invalid productId' });
  }
  
  
  
  switch (method) {
    case "PUT":
      try {
        const updated = req.body
        const product = await Product.findByIdAndUpdate(id, updated,
            { new: true, runValidators: true, context: 'query' });
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
