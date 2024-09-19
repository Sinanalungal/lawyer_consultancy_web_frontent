import { getAxiosInstance } from "../api/axiosInstance";
import { UpdatePasswordParams } from "../types";


export const fetchBlogs = async (url: string, search: string, status: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(url, {
      params: {
        search: search,
        status: status
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

export const updateBlogIsListed = async (blogId: number, status: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch(`blogsession/blogs/update_is_listed/`, {
      blog_id: blogId,
      status: status,
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

export const updateComment = async (commentId: number, updatedContent: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch(`blogsession/comments/edit/${commentId}/`, {
      content: updatedContent,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const reportBlog = async (blogId: number, note: string) => {
  const axiosInstance = await getAxiosInstance(); 
  try {
    const response = await axiosInstance.post(`blogsession/blogs/report/${blogId}/`, {
      note: note,
    });
    return response.data; 
  } catch (error) {
    console.error("Error reporting blog:", error);
    throw error;
  }
};


export const deleteComment = async (commentId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.delete(`blogsession/comments/delete/${commentId}/`);
    console.log("Comment deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const BlogDetailGetting = async (blog_id: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(`blogsession/blog-update/${blog_id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BlogUpdating = async (blog_id: number,formData:FormData) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch(`blogsession/blog-update/${blog_id}/`,formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BlogDeleting = async (blog_id: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.delete(`blogsession/blog-update/${blog_id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
