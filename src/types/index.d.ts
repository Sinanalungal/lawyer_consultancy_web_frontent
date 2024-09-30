import { AxiosError } from 'axios';  // Import AxiosError type

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
    is_reported?: boolean;
    status?: string; 
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
  is_reported?:boolean;
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

interface Schedule {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  price: string;
  reference_until: string;
  uuid: string;
  is_completed: boolean;
}


interface SchedulesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Schedule[];
}

interface Lawyer {
  pk:number;
  user_pk:string ;
  user_full_name: string;
  user_profile_image: string;
  departments: { department_name: string }[];
  experience: number;
  description: string;
  languages: { name: string }[];
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
}

interface Departments{
  id: number;
  department_name: string;
}
interface Languages{
  id: number;
  name: string;
}
interface States{
  id: number;
  name: string;
}
interface Appointment {
  uuid: string;
  session_start: string;
  session_end: string;
  scheduling: {
    start_time: string;
    end_time: string;
    lawyer_profile: {
      user: {
        full_name: string;
        profile_image: string | null;
      };
    };
  };
  user_profile: {
    full_name: string;
    profile_image: string | null;
  };
  booked_at: string;
}
interface SelectedCaseData {
  lawyer?: number;     
  case_model: number; 
  is_selected?: boolean;
}
