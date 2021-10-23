import { model, Schema } from "mongoose";
import { User } from "../../generated/graphql";

const schema = new Schema<User>({
  username: String,
  email: String,
});

export const UserModel = model<User>("User", schema);
