import { useEffect, useState } from "react";
import { H1 } from "../typography/heading";
import Card from "../Card";
import { Post } from "@/schema/schema";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function Recommended() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/v1/recommendations`,
          {
            id: user?.id,
          }
        );

        if (response.status === 200 && response.data.status === "ok") {
          setPosts(response.data.posts);
        }
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
