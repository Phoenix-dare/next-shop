import mongoose, { Schema, Types, model, Model } from "mongoose";
 interface ISubCategory{
  name: string;
  category: Types.ObjectId;
  parent: Types.ObjectId;
  child: Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true ,  unique:true,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  parent: { type: Schema.Types.ObjectId, ref: "SubCategory" },
  child: { type: Schema.Types.ObjectId, ref: "SubCategory" },
});

subCategorySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.category = returnedObject.category.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const SubCategory: Model<ISubCategory> = mongoose.models.SubCategory || model("SubCategory", subCategorySchema);

export default SubCategory;
