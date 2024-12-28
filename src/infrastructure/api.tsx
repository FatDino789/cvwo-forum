import { PostData, ApiError } from "../database/database-types";

const API_BASE_URL = "http://localhost:8080/api";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

// API connection to get posts
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

// API connection to log in users
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
