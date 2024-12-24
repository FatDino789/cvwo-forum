import { PostData, ApiError } from "../database/types";

const API_BASE_URL = "http://localhost:8080/api";

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
    return data as PostData[];
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
};
