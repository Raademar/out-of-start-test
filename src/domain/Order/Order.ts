import { model, Schema, SchemaTypes } from "mongoose";
import { Order } from "../../generated/graphql";

const schema = new Schema<Order>({
  processed: { type: Boolean, required: true },
  items: [{ type: SchemaTypes.ObjectId, ref: "Item", required: true }],
  creationDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
});

export const OrderModel = model<Order>("Order", schema);
