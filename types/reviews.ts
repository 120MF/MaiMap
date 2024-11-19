export interface review {
  review_id: number;
  store_id: number;
  username: string;
  email: string;
  rating: number;
  arcade_count: number;
  coin_price: number | null;
  pc_coin_count: number;
  comment: string;
  created_at: string;
  vote: number;
  show_email: boolean;
}
