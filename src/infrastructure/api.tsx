import { PostData, ApiError, CommentData } from "../database/database-types";
import { TagProps } from "../components/filter/search-tag";
import { CreatePostInput } from "../components/forum/create-post-form";
import { v4 } from "uuid";

const API_BASE_URL = "http://localhost:8080/api";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  id: string;
  email: string;
  password: string;
  username: string;
  icon_index: number;
  color_index: number;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    icon_index: number;
    color_index: number;
    likes: string[];
  };
};

type UpdatePostField = {
  field: string;
  value: number;
  postId: string;
};

type UpdateLikesInput = {
  userId: string;
  postId: string;
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

export const updatePost = async ({
  field,
  value,
  postId,
}: UpdatePostField): Promise<PostData | ApiError> => {
  try {
    const payload = { field, value };

    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
    console.error("Error updating post:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export const setupPostEventListener = (
  setPostArray: React.Dispatch<React.SetStateAction<PostData[]>>,
  selectedPost: PostData,
  setSelectedPost: React.Dispatch<React.SetStateAction<PostData>>
) => {
  const eventSource = new EventSource(`${API_BASE_URL}/events/posts`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data) as PostData[];
    setPostArray(data);
  };

  eventSource.addEventListener("post_update", (event) => {
    const post = JSON.parse(event.data) as PostData;
    setPostArray((posts) => posts.map((p) => (p.id === post.id ? post : p)));
    if (selectedPost.id === post.id) setSelectedPost(post);
  });

  eventSource.addEventListener("comment_added", (event) => {
    const { postId, comment } = JSON.parse(event.data) as {
      postId: string;
      comment: CommentData;
    };
    setPostArray((posts) =>
      posts.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    if (selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        comments: [...prev.comments, comment],
      }));
    }
  });

  return eventSource;
};

// Comment API functions
export const addComment = async (
  postId: string,
  comment: CommentData
): Promise<PostData | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "comments",
        value: comment,
        postId,
      }),
    });

    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    return await response.json();
  } catch (error) {
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

export const setupTagEventListener = (
  setTagArray: React.Dispatch<React.SetStateAction<TagProps[]>>
) => {
  const eventSource = new EventSource(`${API_BASE_URL}/events/tags`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data) as TagProps[];
    setTagArray(() => [...data]);
  };

  eventSource.addEventListener("tag_update", (event) => {
    const updatedTag = JSON.parse(event.data) as TagProps;
    setTagArray((prevTags) =>
      prevTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
  });

  eventSource.addEventListener("tag_created", (event) => {
    const newTag = JSON.parse(event.data) as TagProps;
    setTagArray((prevTags) => [...prevTags, newTag]);
  });

  eventSource.addEventListener("tag_deleted", (event) => {
    const deletedTagId = JSON.parse(event.data) as string;
    setTagArray((prevTags) =>
      prevTags.filter((tag) => tag.id !== deletedTagId)
    );
  });

  return eventSource;
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

    return {
      token: data.token,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        icon_index: data.user.icon_index,
        color_index: data.user.color_index,
        likes: data.user.likes,
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

export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Registration failed:", errorText);
      return {
        message: errorText || "Registration failed",
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

    localStorage.setItem("token", data.token);

    return {
      token: data.token,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        icon_index: data.user.icon_index,
        color_index: data.user.color_index,
        likes: data.user.likes,
      },
    };
  } catch (error) {
    console.error("Unexpected error during registration:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

// API functions for user likes
export const updateUserLikes = async ({
  userId,
  postId,
}: UpdateLikesInput): Promise<LoginResponse | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/likes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "likes",
        value: postId,
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
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};

export const fetchUserLikes = async (
  userId: string
): Promise<string[] | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/likes`, {
      method: "GET", // Changed to GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        message: `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data.likes;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};
export type { LoginCredentials, LoginResponse };
