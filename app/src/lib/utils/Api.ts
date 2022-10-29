import { BASE_URL } from "$lib/config";
import type { RequestParams } from "../../types";

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type APIResponse = {
	body?: {
		[key: string]: string;
		value: string;
	};
	status: number;
	ok: boolean;
};

//defaults.baseURL = BASE_URL;
//defaults.withCredentials = true;

export async function signupUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response.json();
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}

export async function logoutUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response.json();
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}



export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.get("/api/auth/logout");
    if (res.data.type === "success") {
      localStorage.removeItem("token");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const editUser = async (userId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/user/${userId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.delete(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getUsers = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await axios.get(`/api/user?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const searchUsers = async (search) => {
  try {
    const res = await axios.get(`/api/user?search=${search}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const followUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/user/${userId}/follow`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const unFollowuser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/user/${userId}/unfollow`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

//------------------------------ Post -----------------------------
export const createPost = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.post(`/api/post/`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePost = async (postId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/post/${postId}`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllPosts = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await axios.get(`/api/post?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const explorePosts = async ({ page = 0, limit = 5 }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `/api/post/explore?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.delete(`/api/post/${postId}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/post/${postId}/like`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const disLike = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await axios.put(`/api/post/${postId}/unlike`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
