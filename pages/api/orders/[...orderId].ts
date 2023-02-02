import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/order";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
 
  await dbConnect();
  const orderId = req.query.orderId;
  let id: any;
  
  if (Array.isArray(orderId) && orderId.length >= 2) {
    id = orderId[1];
  } else {
    id = undefined;
    
    res.status(400).json({ success:false,error: 'Invalid productId' });
  }
  switch (method) {
    case "PUT":
      try {
        const order = await Order.findById(id);

        if (!order) {
          return res.status(404).json({
            success: false,
            message:
              "Cannot find order.Check if the information provided is correct",
          });
        }

        if (order.orderStatus === "Delivered") {
          return res.status(400).json({
            success: false,
            message: "Item is already delivered",
          });
        }

        /*if (req.body.status === "Shipped") {
          order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
          });
        }*/
        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
          order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });
        res.status(200).json({
          success: true,
          message: "Order Successfull!",
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error });
        }
      }
      break;

    case "DELETE":
      try {
        const order = await Order.findById(id);
        if (!order) {
          return res.status(404).json({
            success: false,
            message:
              "Cannot find order.Check if the information provided is correct",
          });
        }
        await order.remove();

        res.status(204).json({
          success: true,
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error });
        }
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
