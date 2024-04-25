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
import { Textarea } from "./ui/textarea";
import { LiaTelegramPlane } from "react-icons/lia";
import { supabaseClient } from "@/lib/supabaseClient";
import { pipeline } from "@xenova/transformers";

interface FormData {
  id?: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string;
  user_id: string | undefined;
}

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const initialData: FormData = {
    title: "",
    description: "",
    images: [],
    category: "",
    tags: "",
    user_id: user?.id,
  };
  const [formData, setFormData] = useState<FormData>(initialData);
  const [fileLists, setFileLists] = useState<FileList | null>(null);
  // const [imagesBase64, setImagesBase64] = useState<
  //   (string | ArrayBuffer | null)[]
  // >([]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   convertToBase64(file).then((imageBase64) =>
      //     setImagesBase64((prev) => [...prev, imageBase64])
      //   );
      // }
      setFileLists(files);
    }
  };

  // const convertToBase64 = (
  //   file: File
  // ): Promise<ArrayBuffer | string | null> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleCategory = (value: string) =>
    setFormData({
      ...formData,
      category: value,
    });

  const handleTags = (event: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      tags: event.target.value,
    });

  const handleSubmit = async () => {
    try {
      const generateEmbedding = await pipeline(
        "feature-extraction",
        "Supabase/gte-small"
      );

      // Generate a vector using Transformers.js
      const text =
        `${formData.title} ${formData.description} ${formData.category} ${formData.tags}`
          .replace(/[,.\\-]/g, " ")
          .toLowerCase();
      const output = await generateEmbedding(text, {
        pooling: "mean",
        normalize: true,
      });

      // Extract the embedding output
      const embedding = Array.from(output.data);

      const formDetails = {
        title: formData.title,
        description: formData.description,
        images: formData.images,
        category: formData.category,
        tags: formData.tags.split(", "),
        embedding,
        user_id: formData.user_id,
      };

      const { data, error } = await supabaseClient
        .from("posts")
        .insert(formDetails)
        .select();

      if (error) throw new Error(error.message);

      const postResponse: FormData = data[0];

      // Upload images to buckets

      if (fileLists) {
        const imageUploadPromises = Array.from(fileLists).map(
          async (file, index) => {
            const { data, error } = await supabaseClient.storage
              .from("posts_images")
              .upload(`${user?.id}/${postResponse.id}/${index}`, file);

            if (error) return console.log(error);

            return data.path;
          }
        );

        const uploadedImagePaths = await Promise.all(imageUploadPromises);

        const { error } = await supabaseClient
          .from("posts")
          .update({ images: uploadedImagePaths })
          .eq("id", postResponse.id)
          .select();

        if (error) throw new Error(error.message);

        setFormData(initialData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return null;
  }

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
        <NavLink
          className="hover:bg-nav-item-hover hover:text-black text-gray-500 hover:font-semibold font-medium text-sm px-4 py-2 rounded-full cursor-pointer"
          to="/similar-images"
        >
          Similar Images
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
                exquisite piece of art.
                <br />
                🖌️ Let your imagination run wild and immerse yourself in a
                journey of creativity and expression.
              </SheetDescription>
            </SheetHeader>
            <form
              className="flex flex-col justify-start items-start gap-4 my-4"
              onSubmit={handleSubmit}
            >
              <Label htmlFor="image" className="text-lg">
                Images
              </Label>
              <Input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                id="image"
                onChange={handleImageSelect}
                multiple
              />
              <div className="flex justify-start items-start gap-x-4 w-full">
                <div className="flex flex-col justify-start items-stretch gap-2 w-6/12">
                  <Label htmlFor="title" className="text-lg">
                    Title
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleTitle}
                  />
                  <Label htmlFor="description" className="text-lg">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Type your description here..."
                    value={formData.description}
                    onChange={handleDescription}
                  />
                </div>
                <div className="flex flex-col justify-start items-stretch gap-2 w-6/12">
                  <Label htmlFor="category" className="text-lg">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category of art" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="sketch">Sketch</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="illustration">
                          Illustration
                        </SelectItem>
                        <SelectItem value="3d-modelling">
                          3D Modelling
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="tags" className="text-lg">
                    Tags
                  </Label>
                  <Input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={handleTags}
                  />
                </div>
              </div>
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="bg-dribbble-1 hover:bg-dribbble-1 flex justify-center items-center gap-2"
                  onClick={handleSubmit}
                >
                  Share
                  <LiaTelegramPlane className="text-lg font-bold" />
                </Button>
              </SheetClose>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
