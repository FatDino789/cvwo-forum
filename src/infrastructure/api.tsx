import { PostData, ApiError } from "../database/database-types";
import { TagProps } from "../components/filter/search-tag";
import { CreatePostInput } from "../components/forum/create-post-form";
import { v4 } from "uuid";

const API_BASE_URL = "http://localhost:8080/api";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

// Post API functions
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

export const createPost = async (
  postData: CreatePostInput
): Promise<PostData | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...postData,
        id: v4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes_count: 0,
        views_count: 0,
        comments: [],
      }),
    });

    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

// Tag API functions
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

export const createNewTag = async (
  tag: TagProps
): Promise<TagProps | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tag,
      }),
    });

    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating tag:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export const updateTagSearchCount = async (
  tagId: string
): Promise<TagProps | ApiError> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tags/${tagId}/increment-search`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating tag search count:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

// Authentication API functions
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

    if (!data.token || !data.user) {
      return {
        message: "Invalid server response",
        status: 500,
      };
    }

    console.log(data);

    return {
      token: data.token,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};
export type { LoginCredentials, LoginResponse };
