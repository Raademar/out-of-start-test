import { model, Schema } from "mongoose";
import { Item } from "../../generated/graphql";

const schema = new Schema<Item>({
  name: { type: String, required: true },
  productUrl: { type: String, required: true },
  productImageUrl: { type: String, required: true },
});

export const ItemModel = model<Item>("Item", schema);
