import { useState, useEffect, createContext } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

// create a context for authentication
export const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;

      if (session) {
        // First check whether user data already exists or not in db

        const { data, error } = await supabaseClient
          .from("users")
          .select("id")
          .eq("id", session.user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // The ID exists in the "users" table
          setSession(session);
          setUser(session.user);
          setLoading(false);
        } else {
          // The ID does not exist in the "users" table
          const { data, error } = await supabaseClient
            .from("users")
            .insert({
              id: session.user.id,
              full_name: session.user.user_metadata.full_name,
              username: session.user.email
                ?.slice(0, session.user.email?.indexOf("@"))
                .replace(".", ""),
              email: session.user.user_metadata.email,
              avatar_url: session.user.user_metadata.avatar_url,
              bio: "",
              location: "",
            })
            .select();

          if (error) throw error;

          if (data) {
            console.log(data);
          }
        }
      }
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
