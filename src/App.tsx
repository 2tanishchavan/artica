import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthLayout, RootLayout } from "./layouts";
import { Login } from "./pages/auth";
import { Inspiration, LearnArt, FindWork, HireArtist } from "./pages/content";
import { supabase } from "./lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import "./App.css";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    })();
    // supabase.auth.signOut();
  }, []);

  const unauthenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    )
  );

  const authenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/inspiration" />} />
        <Route path="inspiration" element={<Inspiration />} />
        <Route path="learn-art" element={<LearnArt />} />
        <Route path="find-work" element={<FindWork />} />
        <Route path="hire-artist" element={<HireArtist />} />
      </Route>
    )
  );

  if (user) {
    return <RouterProvider router={authenticatedRouter} />;
  } else {
    return <RouterProvider router={unauthenticatedRouter} />;
  }
}
