export type TagData = {
  id: string;
  text: string;
  color: string;
  searches: number;
};

export type Comment = {
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
  picture_url?: string;
  created_at: string;
  likes_count: number;
  views_count: number;
  discussion_thread?: string;
  comments: Comment[];
  tags: string[];
  updated_at: string;
};

export type ApiError = {
  message: string;
  status: number;
};
