import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items:any)=> {

  const {tax,total,shippingCost,totalPayable} = items
  return  Number(tax+total+shippingCost+totalPayable)*100
};

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { items } = req.body;

  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items[0]),
    currency: "inr",
    description:"testing integration",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  
  });
};