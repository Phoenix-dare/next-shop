import mongoose, { Schema, Types, model, Model } from "mongoose";

interface IOrder {
  shippingInfo: {
    address: {
      type: string;
    };
    city: {
      type: string;
    };
    state: {
      type: string;
    };
    country: {
      type: string;
    };
    pinCode: {
      type: number;
    };
    phoneNo: {
      type: number;
    };
    orderItems: [
      {
        name: string;
        price: number;
        quantity: number;
        image: string;
        product: Types.ObjectId;
      }
    ];
  };
  user: Types.ObjectId;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
  itemsPrice: number;

  taxPrice: number;
  shippingPrice: number;

  totalPrice: number;

  orderStatus: string;
  deliveredAt: number;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

orderSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const OrderModel: Model<IOrder> =
  mongoose.models.Order || model("Order", orderSchema);
export default OrderModel;
