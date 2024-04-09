import { UUID } from "crypto";
import { User } from "@/schema/schema";

export interface Job {
  job_id: UUID;
  job_role: string;
  job_description: string;
  job_type: "Full Time" | "Part Time" | "Contract" | "Freelance" | "Internship";
  work_type: "On-Site" | "Hybrid" | "Remote";
  experience_level: "Entry-Level" | "Mid-Level" | "Senior-Level";
  location: string;
  salary: number;
  users: User;
  posted_at: string;
}
