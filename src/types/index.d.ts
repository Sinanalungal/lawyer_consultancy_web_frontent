interface Blog {
    id: number;
    title: string;
    user: {
      email: string;
      full_name: string;
      profile: string;
    };
    image: string;
    like_count: number;
    saved_count: number;
    created_at: string;
    description?: string;
    report_count?: number;
    is_liked?: boolean;
    is_saved?: boolean; 
    is_listed?: boolean; 
    content?:string;
}

interface ReadingBlog {
  id: number;
  imageUrl: string;
  date: string;
  title: string;
  description?: string;
  likes: number;
  saves: number;
  is_saved?: boolean;
  is_liked?: boolean;
  author: string;
  authorImage?: string;
  content?:string
}

interface BlogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
}


interface BlogResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Blog[];
}

// user types

export interface User {
  pk: number;
  full_name: string;
  email: string;
  phone_number: string;
  profile_image: string;
  is_verified: boolean;
  created_at: string; 
}

export interface UserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}