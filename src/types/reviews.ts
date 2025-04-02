import { ObjectId } from "mongodb";

export interface review {
  _id: ObjectId;
  store_id: number;
  user_id: ObjectId;
  rating: number;
  comment: string;
  created_at: string; // ISO, UTC , not GMT+8
  vote: number;
}
