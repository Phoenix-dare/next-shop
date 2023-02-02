import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/order";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) => {
          totalAmount += order.totalPrice;
        });

        res.status(200).json({
          success: true,
          totalAmount,
          orders,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    default:
      res.status(400).json({ success: false });
      break;
  }
}
