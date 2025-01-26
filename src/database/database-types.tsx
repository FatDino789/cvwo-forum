export type CommentData = {
  id: string;
  content: string;
  created_at: string;

  user_id: string;
  username: string;
  icon_index: number;
  color_index: number;
};

export type PostData = {
  id: string;
  user_id: string;
  username: string;
  icon_index: number;
  color_index: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  views_count: number;
  comments: CommentData[];
  tags: string[];
};

export type ApiError = {
  message: string;
  status: number;
};
