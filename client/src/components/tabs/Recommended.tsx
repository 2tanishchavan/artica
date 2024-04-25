import { useEffect, useState } from "react";
import { H1 } from "../typography/heading";
import Card from "../Card";
import { Post } from "@/schema/schema";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import axios from "axios";

export default function Recommended() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        const { data: liked_posts, error: error1 }: any = await supabaseClient
          .from("liked_posts")
          .select("posts(id, embedding)")
          .eq("user_id", session?.user.id);

        if (error1) throw new Error(error1.message);

        const { data: all_posts, error: error2 }: any = await supabaseClient
          .from("posts")
          .select("id, embedding");

        if (error2) throw new Error(error2.message);

        const response = await axios.put(
          "http://localhost:5000/recommendations",
          {
            liked_posts,
            all_posts,
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommendedPosts();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-4 gap-7">
          {posts?.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <H1 className="text-center">Posts are unavailable :(</H1>
      )}
    </>
  );
}
