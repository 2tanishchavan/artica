export type User = {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  updated_at?: string;
  created_at?: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  user: User;
  created_at?: string;
};
