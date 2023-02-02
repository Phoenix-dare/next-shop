import mongoose, { Schema, Types, model, Model } from "mongoose";

interface IProduct {
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: [{ public_id: string }];
  stock: number;
  reviews: [
    {
      user: Types.ObjectId;
      name: string;
      rating: string;
      comment: string;
    }
  ];
  user: Types.ObjectId;
  category: Types.ObjectId;
  subCategory: Types.ObjectId;

}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
    },
  ],

  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
},
{timestamps:true}

);

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.category = returnedObject._id.toString();
    returnedObject.subCategory = returnedObject._id.toString();
    returnedObject.user = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product: Model<IProduct> =
  mongoose.models["Product"] || model("Product", productSchema);
export default Product;
