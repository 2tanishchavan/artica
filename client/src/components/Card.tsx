import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/schema/schema";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { H3, H4, H5 } from "./typography/heading";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { supabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

interface CardProps {
  post: Post;
}

export default function Card({ post }: CardProps) {
  const [likedId, setLikedId] = useState<string>("");
  const [suggestions] = useState<Post[]>([]);
  const { session } = useAuth();

  const handleLike = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("liked_posts")
        .insert({
          user_id: session?.user.id,
          post_id: post.id,
        })
        .select();

      if (error) throw new Error(error.message);

      if (data) {
        setLikedId(data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      const { error } = await supabaseClient
        .from("liked_posts")
        .delete()
        .eq("id", likedId);

      if (error) throw new Error(error.message);

      setLikedId("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const fetchSimilarPosts = async () => {
    //   try {
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_SERVER_URL}/v1/suggestions`,
    //       { id: post.id }
    //     );
    //     if (response.status === 200 && response.data.status === "ok") {
    //       setSuggestions(response.data.posts);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const fetchLikedPosts = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("liked_posts")
          .select("id")
          .eq("user_id", session?.user.id)
          .eq("post_id", post.id);

        if (error) throw new Error(error.message);

        if (data) {
          setLikedId(data[0]?.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // fetchSimilarPosts();
    fetchLikedPosts();
  }, []);

  return (
    <>
      <Sheet>
        <div className="card w-[340px] h-[260px]">
          <SheetTrigger asChild>
            <div className="h-5/6 relative group cursor-pointer">
              <img
                src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${
                  post.images[0]
                }`}
                alt={post.title}
                className="h-full w-full object-cover rounded-md transition-all group-hover:blur-[0.8px] group-hover:brightness-50"
              />
              <H4 className="absolute left-2 bottom-2 text-white z-10 opacity-0 transition-opacity group-hover:opacity-100">
                {post.title}
              </H4>
            </div>
          </SheetTrigger>
          <div className="flex justify-between items-center my-2">
            <Link
              to={`/profile/${post.users?.username}`}
              className="flex justify-between items-center gap-x-2"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={post.users?.avatar_url}
                  alt={post.users?.username}
                />
                <AvatarFallback>
                  {post.users[0]?.full_name
                    .split(" ")
                    .map((word: string) => word[0])}
                </AvatarFallback>
              </Avatar>
              <H5>{post.users?.full_name}</H5>
            </Link>
            {likedId ? (
              <AiFillHeart
                className="cursor-pointer text-2xl w-1/12 text-dribbble-1"
                onClick={handleDislike}
              />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer text-2xl w-1/12"
                onClick={handleLike}
              />
            )}
          </div>
        </div>
        <SheetContent side="bottom" className="w-full h-[95%]">
          <SheetHeader>
            <div className="flex justify-start items-center pb-4 border-b-2">
              <Link
                to={`/profile/${post.users?.username}`}
                className="flex justify-between items-center gap-x-2"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={post.users?.avatar_url}
                    alt={post.users?.username}
                  />
                  <AvatarFallback>
                    {post.users[0]?.full_name
                      .split(" ")
                      .map((word: string) => word[0])}
                  </AvatarFallback>
                </Avatar>
                <H3>{post.users?.full_name}</H3>
              </Link>
            </div>
          </SheetHeader>
          <SheetTitle>
            <div className="text-2xl mb-2">{post.title}</div>
          </SheetTitle>
          <SheetDescription className="mb-2">
            {post.description}
          </SheetDescription>
          <div className="mb-4">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="w-fit rounded-md bg-slate-100 mr-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col justify-between items-start h-[550px]">
            <div className="flex justify-start items-center gap-4 overflow-x-scroll no-scrollbar">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${image}`}
                  alt={post.title}
                  className="h-[220px] w-[340px] object-cover rounded-md cursor-pointer"
                />
              ))}
            </div>
            {suggestions.length > 0 && (
              <>
                <H4 className="my-4">Suggested Posts</H4>
                <div className="flex justify-start items-center gap-4 overflow-x-scroll no-scrollbar">
                  {suggestions.map((post, index) => (
                    <Card key={index} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
