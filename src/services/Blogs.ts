import { getAxiosInstance } from "../api/axiosInstance";
import { UpdatePasswordParams } from "../types";


export const fetchBlogs = async (url: string, search: string, blocked: boolean) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(url, {
      params: {
        search: search,
        blocked: blocked.toString(), 
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    throw error;
  }
};

export const fetchBlogsUser = async (url: string, search?: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(url, {
      params: {
        search: search,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    throw error;
  }
};

export const updateBlogIsListed = async (blogId: number, isListed: boolean) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch(`blogsession/blogs/update_is_listed/`, {
      blog_id: blogId,
      is_listed: isListed,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating blog is_listed status:", error);
    throw error;
  }
};

export const updateBlogLike = async (blogId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch('blogsession/blogs/like/', {
      blog_id: blogId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating blog like status:", error);
    throw error;
  }
};

export const updateBlogSave = async (blogId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch('blogsession/blogs/save/', {
      blog_id: blogId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating blog save status:", error);
    throw error;
  }
};

export const getBlogComments = async (blogId: number, page: number = 1) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('blogsession/blogs/comments/', {
      params: {
        blog_id: blogId,
        page: page,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting blog comments:", error);
    throw error;
  }
};

export const postBlogComment = async (blogId: number, content: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.post('blogsession/blogs/comments/', {
      blog_id: blogId,
      content: content,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting blog comment:", error);
    throw error;
  }
};


export const updatePassword = async (params: UpdatePasswordParams) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.post('api/change-password/', {
      current_password: params.currentPassword,
      new_password: params.newPassword,
      confirm_new_password:params.confirmPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};