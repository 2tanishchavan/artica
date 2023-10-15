import { NavLink, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center mx-10 py-6 border-b-2 border-b-gray-100">
      <Link
        to="/inspiration"
        className="left-section logo font-extrabold text-3xl"
      >
        Artica
      </Link>
      <div className="center-section flex justify-between items-center gap-x-10">
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="/inspiration"
        >
          Inspiration
        </NavLink>
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="/learn-art"
        >
          Learn Art
        </NavLink>
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="find-work"
        >
          Find Work
        </NavLink>
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="hire-artist"
        >
          Hire Artist
        </NavLink>
      </div>
      <div className="right-section flex justify-center items-center gap-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="PF" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full bg-dribbble-1 hover:bg-dribbble-1 shadow-lg shadow-dribbble-1/30">
              Share Art
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="w-full h-[90%]">
            <SheetHeader>
              <SheetTitle>
                <h1 className="text-2xl">Share your artwork on Artica</h1>
              </SheetTitle>
              <SheetDescription>
                <p>🎨 Embrace the world of colors, shapes, and emotions with this exquisite piece of art.</p>
                <p>🖌️ Let your imagination run wild and immerse yourself in a journey of creativity and expression.</p>
              </SheetDescription>
            </SheetHeader>
            <div className="grid justify-start items-start gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
