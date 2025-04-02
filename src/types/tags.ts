import { ObjectId } from "mongodb";

export type tag = {
  _id: ObjectId;
  created_at: string;
  vote: number;
  name: string;
  store_id: number;
  user_id: ObjectId;
};
