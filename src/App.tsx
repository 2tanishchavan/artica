import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthLayout, RootLayout } from "./layouts";
import { Login, Signup } from "./pages/auth";
import { Inspiration, LearnArt, FindWork, HireArtist } from "./pages/content";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    setUser((prev) => !prev);
  }, []);

  const unauthenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  const authenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Navigate to="inspiration" />} />
        <Route index path="inspiration" element={<Inspiration />} />
        <Route index path="learn-art" element={<LearnArt />} />
        <Route index path="find-work" element={<FindWork />} />
        <Route index path="hire-artist" element={<HireArtist />} />
      </Route>
    )
  );

  return (
    <RouterProvider
      router={user ? authenticatedRouter : unauthenticatedRouter}
    />
  );
}