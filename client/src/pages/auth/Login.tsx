import { useState } from "react";
import { H1, H2 } from "@/components/typography/heading";
import { Lead } from "@/components/typography/lead";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import { BsGoogle } from "react-icons/bs";

export const Login: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/",
        },
      });

      if (error) {
        setLoading(false);
        throw new Error(error.message);
      }

      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="login flex flex-col justify-center items-center gap-4 h-[90vh]">
      <H1 className="logo">Artica</H1>
      <H2>Let's get started</H2>
      <Lead>Sign in to the community and get started immediately</Lead>
      {loading ? (
        <Button
          className="bg-dribbble-1 shadow-lg shadow-dribbble-1/30 w-1/4 p-2"
          disabled
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button
          className="bg-dribbble-1 shadow-lg shadow-dribbble-1/30 hover:bg-dribbble-1 hover:shadow-xl hover:shadow-dribbble-1/30 w-1/4 p-2"
          onClick={handleLogin}
        >
          <BsGoogle className="mr-2" /> Login with Google
        </Button>
      )}
    </div>
  );
};
