import { Job } from "@/types/Job";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaLocationDot } from "react-icons/fa6";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

export default function JobApplication({ job }: { job: Job }) {
  const {
    job_id,
    job_role,
    job_description,
    job_type,
    work_type,
    experience_level,
    location,
    salary,
    users: { id, full_name, avatar_url, email },
    posted_at,
  } = job;

  const date = new Date(posted_at);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-start items-start border-2 rounded-md min-w-[350px] p-4 cursor-pointer">
          <Avatar className="mr-4">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={avatar_url}
              alt={full_name}
            />
            <AvatarFallback>
              {full_name.split(" ")[0] + full_name.split(" ")[1]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex flex-col">
              <div className="text-xl font-medium leading-none">
                {full_name}
              </div>
              <div className="text-slate-500 text-sm">
                {job_role} &#8226; {job_type}
              </div>
            </div>
            <div className="text-dribbble-1 text-sm">${salary}/month</div>
            <div className="gap-1 bg-slate-200/40 flex justify-start items-baseline text-xs font-medium px-2 py-1 rounded-md">
              <FaLocationDot />
              {location}
            </div>
          </div>
          <div className="flex self-end text-xs text-slate-600 font-medium">
            {formattedDate}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex flex-col justify-start items-start gap-10 h-[640px]"
      >
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle className="flex justify-start items-center">
            <Avatar className="mr-4">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={avatar_url}
                alt={full_name}
              />
              <AvatarFallback>
                {full_name.split(" ")[0] + full_name.split(" ")[1]}
              </AvatarFallback>
            </Avatar>
            <div className="text-4xl font-medium leading-none">{full_name}</div>
          </SheetTitle>
          <SheetDescription className="gap-1 bg-slate-200/40 flex justify-start items-baseline text-xl font-medium py-2 px-4 rounded-lg w-fit">
            <FaLocationDot />
            {location}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="text-xl">
            <b>Post Date:</b> {formattedDate}
          </div>
          <div className="text-xl">
            <b>Recruiter Email:</b> <Link to={`mailto:${email}`}>{email}</Link>
          </div>
          <div className="text-xl">
            <b>Job Id:</b> {job_id}
          </div>
          <div className="text-xl">
            <b>Job Role:</b> {job_role}
          </div>
          <div className="text-xl">
            <b>Job Description:</b>
            <br />
            {job_description}
          </div>
          <div className="flex">
            <Badge variant="secondary" className="mr-4 rounded-md p-2">
              {job_type}
            </Badge>
            <Badge variant="secondary" className="mr-4 rounded-md p-2">
              {work_type}
            </Badge>
            <Badge variant="secondary" className="rounded-md p-2">
              {experience_level}
            </Badge>
          </div>
          <div>
            <b>Salary:</b>{" "}
            <span className="text-dribbble-1">${salary}/month</span>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="bg-dribbble-1 hover:bg-dribbble-1/80"
              size="lg"
              type="submit"
            >
              Apply
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
