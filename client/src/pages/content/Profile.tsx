import About from "@/components/About";
import Card from "@/components/Card";
import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { Post } from "@/schema/schema";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface UserDetails {
  id: string;
  full_name: string;
  avatar_url: string;
  bio?: string | null;
  location?: string | null;
}

export default function Profile() {
  const { session } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [likedPosts, setLikedPosts] = useState<Post[] | null>();

  useEffect(() => {
    (async () => {
      const { data: users, error } = await supabaseClient
        .from("users")
        .select("id, full_name, avatar_url, bio, location")
        .eq("id", session?.user.id);

      if (error) throw error;

      if (users && users.length > 0) {
        setUserDetails(users[0]);
      }
    })();
  }, [session?.user.id]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const { data, error } = await supabaseClient
        .from("liked_posts")
        .select("post_id")
        .eq("user_id", session?.user.id);

      if (error) throw error;

      if (data) {
        const lipost: any = data.map(async (post) => {
          const {
            data: posts,
            error: posts_error,
          }: { data: Post[] | null; error: any } = await supabaseClient
            .from("posts")
            .select(
              "id, title, description, category, tags, images, created_at, users(id, full_name, username, avatar_url, email, bio, location, updated_at, created_at)"
            )
            .eq("id", post.post_id);

          if (posts_error) throw posts_error;

          return posts;
        });

        if (lipost) {
          setLikedPosts(lipost);
        }
      }
    };
    fetchLikedPosts();
  }, []);

  return (
    <div className="mx-10 py-6 flex flex-col justify-start items-stretch gap-20">
      <div className="profile flex gap-x-10 justify-center items-center">
        <div className="avatar h-32 w-32 rounded-full">
          <img
            src={userDetails?.avatar_url}
            alt={userDetails?.full_name}
            className="h-32 w-32 rounded-full"
          />
        </div>
        <div className="details flex flex-col justify-start items-start gap-y-2">
          <div className="full-name text-3xl font-bold">
            {userDetails?.full_name}
          </div>
          <Muted className="text-xl font-medium">
            {userDetails?.location || "Mumbai"}
          </Muted>
          <Link to="edit-profile">
            <Button variant="outline" className="rounded-full">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="work">
        <TabsList className="grid w-60 grid-cols-3">
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <hr className="my-5" />
        <TabsContent value="work">Work</TabsContent>
        <TabsContent value="liked">
          {likedPosts?.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  );
}
