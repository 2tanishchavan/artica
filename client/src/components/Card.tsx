import { useState } from "react";
import Post1 from "../assets/post1.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Card() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="card w-[340px] h-[260px]">
      <img
        src={Post1}
        alt="post1"
        className="h-5/6 w-full object-cover rounded-md"
      />
      <div className="flex justify-between items-center my-2">
        <p className="font-medium w-11/12">An amazing illustration</p>
        {isLiked ? (
          <AiFillHeart
            className="cursor-pointer text-2xl w-1/12 text-dribbble-1"
            onClick={() => setIsLiked((prev) => !prev)}
          />
        ) : (
          <AiOutlineHeart
            className="cursor-pointer text-2xl w-1/12"
            onClick={() => setIsLiked((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
