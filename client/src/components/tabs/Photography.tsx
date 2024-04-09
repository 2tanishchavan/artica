import { useEffect, useState } from "react";
import { Post } from "@/schema/schema";
import Card from "../Card";
import { supabaseClient } from "@/lib/supabaseClient";
import { H1 } from "../typography/heading";

export default function Photography() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPhotographyPosts = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("posts")
          .select("*")
          .eq("category", "photography");
        if (error) throw new Error(error.message);
        if (data) {
          const postList = data.map(async (post) => {
            const { data, error } = await supabaseClient
              .from("users")
              .select("*")
              .eq("id", post.user_id);
            if (error) throw new Error(error.message);
            if (data) {
              return { ...post, users: data[0] };
            }
          });

          setPosts(await Promise.all(postList));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPhotographyPosts();
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
