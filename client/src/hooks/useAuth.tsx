import { AuthContext } from "@/context/Auth";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);