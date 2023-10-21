import { NavLink, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { UserNav } from "./UserNav";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormData {
  title: string;
  image: ArrayBuffer | string | null;
  category: string;
}

const initialData: FormData = {
  title: "",
  image: null,
  category: "",
};

export const Navbar: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [imageBase64, setImageBase64] = useState<string>("");
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const file = files[0];
      const base64 = convertToBase64(file).toString();
      setImageBase64(base64);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleCategory = (value: string) =>
    setFormData({
      ...formData,
      category: value,
    });

  const handleSubmit = () => {
    const formDetails = {
      title: formData.title,
      image: imageBase64,
      category: formData.category,
    };
    console.log(formDetails);
  };

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
          to="/find-work"
        >
          Find Work
        </NavLink>
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="/hire-artist"
        >
          Hire Artist
        </NavLink>
      </div>
      <div className="right-section flex justify-center items-center gap-x-4">
        <UserNav />
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full bg-dribbble-1 hover:bg-dribbble-1 shadow-lg shadow-dribbble-1/30">
              Share Art
            </Button>
          </SheetTrigger>
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
            <form
              className="grid justify-start items-start gap-4 py-4"
              onSubmit={handleSubmit}
            >
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                value={formData.title}
                className="col-span-5"
                onChange={handleTitle}
              />
              <Label htmlFor="image" className="text-left">
                Image
              </Label>
              <Input
                type="file"
                id="image"
                value={formData.image?.toString()}
                className="col-span-5"
                onChange={handleImageSelect}
              />
              <Label htmlFor="username" className="text-left">
                Category
              </Label>
              <Select value={formData.category} onValueChange={handleCategory}>
                <SelectTrigger className="col-span-5">
                  <SelectValue placeholder="Select a category of art" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="sketch">Sketch</SelectItem>
                    <SelectItem value="painting">Painting</SelectItem>
                    <SelectItem value="illustration">Illustration</SelectItem>
                    <SelectItem value="3d-modelling">3D Modelling</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="bg-dribbble-1 hover:bg-dribbble-1"
                  onClick={handleSubmit}
                >
                  Save changes
                </Button>
              </SheetClose>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
