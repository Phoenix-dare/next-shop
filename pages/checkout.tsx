import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../app/store";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");
  const {order}=useSelector((state:AppState)=>state)

  

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createPaymentIntent() {
  try {
    const response = await axios.post("/api/create-payment-intent", {
      items: [order]
    });
    const { clientSecret } = response.data;
    setClientSecret(clientSecret);
  } catch (error) {
    console.log(error);
  }
}
createPaymentIntent()

  }, [order]);

  const appearance = {
    theme: 'stripe' as "stripe",
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container dark:bg-gray-400">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}