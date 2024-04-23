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

export type Post = {
  id: UUID;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  users: User[];
  created_at?: string;
};
