import { UUID } from "crypto";

export interface User {
  id: UUID;
  full_name: string;
  username?: string;
  avatar_url: string;
  email: string;
  bio?: string | null;
  location?: string | null;
  updated_at?: string;
  created_at?: string;
}

export interface Post {
  id: UUID;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  users: User | User[] | any; // Remove any
  created_at?: string;
}
