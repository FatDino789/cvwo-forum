export type CommentData = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type PostData = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  likes_count: number;
  views_count: number;
  comments: CommentData[];
  tags: string[];
  updated_at: string;
};

export type ApiError = {
  message: string;
  status: number;
};
