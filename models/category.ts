import mongoose, { Schema, Types, model,models,Model } from "mongoose";
import { ICategory } from "../types/types";


const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CategoryModel: Model<ICategory> =  mongoose.models.Category || model("Category", categorySchema);
export default CategoryModel;
