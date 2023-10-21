import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { GrLocation } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { Label } from "./ui/label";

interface AboutDetails {
  bio?: string;
  location?: string;
  created_at: string;
}

export default function About() {
  const { session } = useAuth();
  const [userDetails, setUserDetails] = useState<AboutDetails | null>(null);

  useEffect(() => {
    (async () => {
      const { data: users, error } = await supabaseClient
        .from("users")
        .select("bio, location, created_at")
        .eq("id", session?.user.id);

      if (error) throw error;

      if (users && users.length > 0) {
        setUserDetails({
          bio: users[0].bio || "I am an artist",
          location: users[0].location || "Mumbai",
          created_at: new Date(users[0].created_at).toLocaleDateString(
            "en-IN",
            {
              year: "numeric",
              month: "long",
            }
          ),
        });
      }
    })();
  }, [session?.user.id]);

  return (
    <div className="about grid grid-cols-1 grid-rows-2">
      <div className="w-[500px]">
        <Label about="bio">Biography</Label>
        <div id="bio">{userDetails?.bio}</div>
      </div>
      <div className="bg-slate-100 w-[300px] p-4 rounded-md">
        <div className="location flex justify-start items-center gap-2">
          <GrLocation />
          {userDetails?.location}
        </div>
        <div className="member-since flex justify-start items-center gap-2">
          <BiUser />
          Member since {userDetails?.created_at}
        </div>
      </div>
    </div>
  );
}
