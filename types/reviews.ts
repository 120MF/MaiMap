import { ObjectId } from "mongodb";

export interface review {
  _id: ObjectId;
  store_id: number;
  user_id: ObjectId;
  rating: number;
  arcade_count: number;
  coin_price: number | null;
  pc_coin_count: number;
  comment: string;
  created_at: string;
  vote: number;
}
