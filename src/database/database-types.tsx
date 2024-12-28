export type PostData = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
};

export type ApiError = {
  message: string;
  status?: number;
};
