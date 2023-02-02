import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "../app/store";

const PaymentSuccess= () => {
  const router = useRouter();
  const { query } = router;
  const { order } = useSelector((state: AppState) => state);

  return (
    <div className="flex flex-col items-center p-10 w-min">
      <h1 className="text-2xl font-bold mb-5">Payment Successful!</h1>
      <div className="w-64 bg-white p-5 rounded-lg shadow-lg">
        <p className="text-lg font-medium mb-3">
          Amount: ₹{order.totalPayable}
        </p>
        <p className="text-lg font-medium mb-3">
          Transaction ID: {query.payment_intent}
        </p>
        <p className="text-lg font-medium">Thank you for your purchase.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
