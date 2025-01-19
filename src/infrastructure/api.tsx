import { PostData, ApiError } from "../database/database-types";
import { TagProps } from "../components/filter/search-tag";

const API_BASE_URL = "http://localhost:8080/api";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const getPosts = async (): Promise<PostData[] | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();

    const transformedData = data.map((post: PostData) => {
      // Add null checks and safer date transformation
      const safeTransformDate = (dateString: string | null | undefined) => {
        if (!dateString) return new Date().toISOString();
        try {
          const date = new Date(dateString);
          return !isNaN(date.getTime())
            ? date.toISOString()
            : new Date().toISOString();
        } catch {
          return new Date().toISOString();
        }
      };

      return {
        ...post,
        created_at: safeTransformDate(post.created_at),
        updated_at: safeTransformDate(post.updated_at),
        comments:
          post.comments?.map((comment) => ({
            ...comment,
            created_at: safeTransformDate(comment.created_at),
          })) || [],
        tags: post.tags,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export const getTags = async (): Promise<TagProps[] | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`);
    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const tags = await response.json();
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return {
        message: "Authentication failed",
        status: response.status,
      };
    }

    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export type { LoginCredentials, LoginResponse };
