import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_PROJECT_API_KEY
);

supabaseClient
  .rpc("configure_cors", {
    origins: ["http://localhost:3000"],
  })
  .then((response) => {
    console.log("CORS configuration successful", response);
  })
