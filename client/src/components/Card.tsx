import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Post1 from "../assets/post1.png";
import { H4 } from "./typography/heading";

export default function Card() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <Sheet>
        <div className="card w-[340px] h-[260px]">
          <SheetTrigger asChild>
            <div className="h-5/6 relative group cursor-pointer">
              <img
                src={Post1}
                alt="post1"
                className="h-full w-full object-cover rounded-md transition-all group-hover:blur-[0.8px] group-hover:brightness-50"
              />
              <H4 className="absolute left-2 bottom-2 text-white z-10 opacity-0 transition-opacity group-hover:opacity-100">
                An amazing illustration
              </H4>
            </div>
          </SheetTrigger>
          <div className="flex justify-between items-center my-2">
            <p className="font-medium w-11/12 cursor-pointer">An amazing illustration</p>
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
        <SheetContent side="bottom" className="w-full h-[90%]">
          <SheetHeader>
            <SheetTitle>
              <div className="text-2xl">Share your artwork on Artica</div>
            </SheetTitle>
            <SheetDescription>
              🎨 Embrace the world of colors, shapes, and emotions with this
              exquisite piece of art. 🖌️ Let your imagination run wild and
              immerse yourself in a journey of creativity and expression.
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button
              type="submit"
              className="bg-dribbble-1 hover:bg-dribbble-1"
              onClick={() => {}}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
}
