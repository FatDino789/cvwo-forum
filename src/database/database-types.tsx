import { TagProps } from "../components/filter/search-tag";

export type Comment = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
};

export type PostData = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  picture_url?: string;
  created_at: string;
  likes_count: number;
  views_count: number;
  discussion_thread?: string;
  comments: Comment[];
  tags: TagProps[];
  updated_at: string;
};

export type ApiError = {
  message: string;
  status: number;
};
