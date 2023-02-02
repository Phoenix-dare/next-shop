import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/order";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find({ user: session.user.id });

        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      try {
        const order = await Order.create({
          shippingInfo,
          orderItems,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          paidAt: Date.now(),
          user: session.user.id,
        });

        res.status(201).json({
          success: true,
          date: order,
        });
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
