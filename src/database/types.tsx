export interface PostData {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
