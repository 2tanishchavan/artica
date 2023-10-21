import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/Auth";
import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import { Login } from "@/pages/auth/Login";
import { Inspiration, LearnArt, FindWork, HireArtist, Profile } from "@/pages/content";
import "@/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/inspiration" />} />
            <Route
              path="/inspiration"
              element={
                <ProtectedRoute>
                  <Inspiration />
                </ProtectedRoute>
              }
            />
            <Route
              path="learn-art"
              element={
                <ProtectedRoute>
                  <LearnArt />
                </ProtectedRoute>
              }
            />
            <Route
              path="find-work"
              element={
                <ProtectedRoute>
                  <FindWork />
                </ProtectedRoute>
              }
            />
            <Route
              path="hire-artist"
              element={
                <ProtectedRoute>
                  <HireArtist />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}
