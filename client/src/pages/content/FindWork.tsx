import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import FilterCheckbox from "@/components/FilterCheckbox";
import { FilterCheckbox as FilterCheckboxType } from "@/types/FilterCheckbox";
import { JobTypes } from "@/types/JobTypes";
import { WorkTypes } from "@/types/WorkTypes";
import { ExperienceLevelTypes } from "@/types/ExperienceLevelTypes";
import { Job } from "@/types/Job";
import JobApplication from "@/components/JobApplication";

const JOB_TYPES: FilterCheckboxType[] = [
  {
    id: "fullTime",
    label: "Full Time",
  },
  {
    id: "partTime",
    label: "Part Time",
  },
  {
    id: "contract",
    label: "Contract",
  },
  {
    id: "freelance",
    label: "Freelance",
  },
  {
    id: "internship",
    label: "Internship",
  },
];

const WORK_TYPES: FilterCheckboxType[] = [
  {
    id: "onSite",
    label: "On-Site",
  },
  {
    id: "hybrid",
    label: "Hybrid",
  },
  {
    id: "remote",
    label: "Remote",
  },
];

const EXPERIENCE_LEVEL: FilterCheckboxType[] = [
  {
    id: "entryLevel",
    label: "Entry-Level",
  },
  {
    id: "midLevel",
    label: "Mid-Level",
  },
  {
    id: "seniorLevel",
    label: "Senior-Level",
  },
];

export default function FindWork() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTypes, setJobTypes] = useState<JobTypes>({
    fullTime: true,
    partTime: false,
    contract: false,
    freelance: false,
    internship: false,
  });
  const [workTypes, setWorkTypes] = useState<WorkTypes>({
    onSite: true,
    hybrid: false,
    remote: false,
  });
  const [experienceLevelTypes, setExperienceLevelTypes] =
    useState<ExperienceLevelTypes>({
      entryLevel: true,
      midLevel: false,
      seniorLevel: false,
    });

  const resetFilters = () => {
    setJobTypes({
      fullTime: true,
      partTime: false,
      contract: false,
      freelance: false,
      internship: false,
    });
    setWorkTypes({
      onSite: true,
      hybrid: false,
      remote: false,
    });
    setExperienceLevelTypes({
      entryLevel: true,
      midLevel: false,
      seniorLevel: false,
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error }: { data: Job[] | null; error: any } =
          await supabaseClient
            .from("jobs")
            .select(
              "job_id, job_role, job_description, job_type, work_type, location, experience_level, salary, posted_at, users(id, full_name, avatar_url, email)"
            );
        if (error) throw Error(error.message);

        if (data) {
          setJobs(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {}, [jobTypes]);

  useEffect(() => {}, [workTypes]);

  useEffect(() => {}, [experienceLevelTypes]);

  return (
    <div className="mx-10 py-6 text-3xl h-[100vh]">
      <h1 className="text-4xl">Find Work</h1>
      <div className="flex justify-start gap-10 items-start mt-10 w-full">
        <div className="flex flex-col justify-start items-start w-2/12 h-full border-2 gap-6 rounded-xl p-5">
          <div className="flex justify-between items-baseline w-full">
            <h6 className="text-xl font-semibold">Filter Job</h6>
            <h6
              className="text-sm text-red-500 cursor-pointer"
              onClick={resetFilters}
            >
              Reset Filter
            </h6>
          </div>

          {/* ANCHOR: Job Type */}
          <div className="border-b-2 pb-6 w-full space-y-4">
            <h6 className="text-base font-semibold">Job Type</h6>
            <div className="grid grid-cols-2 gap-4">
              {JOB_TYPES.map((job_type: FilterCheckboxType) => (
                <FilterCheckbox
                  key={job_type.id}
                  id={job_type.id}
                  label={job_type.label}
                  checked={jobTypes[job_type.id as keyof JobTypes]}
                  onCheckedChange={() => {
                    setJobTypes((prev) => {
                      return {
                        ...prev,
                        [job_type.id]: !prev[job_type.id as keyof JobTypes],
                      };
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* ANCHOR: Work Type */}
          <div className="border-b-2 pb-6 w-full space-y-4">
            <h6 className="text-base font-semibold">Work Type</h6>
            <div className="grid grid-cols-2 gap-4">
              {WORK_TYPES.map((work_type: FilterCheckboxType) => (
                <FilterCheckbox
                  key={work_type.id}
                  id={work_type.id}
                  label={work_type.label}
                  checked={workTypes[work_type.id as keyof WorkTypes]}
                  onCheckedChange={() => {
                    setWorkTypes((prev) => {
                      return {
                        ...prev,
                        [work_type.id]: !prev[work_type.id as keyof WorkTypes],
                      };
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* ANCHOR: Experience Level */}
          <div className="mb-4 w-full space-y-4">
            <h6 className="text-base font-semibold">Experience Level</h6>
            <div className="grid grid-cols-2 gap-4">
              {EXPERIENCE_LEVEL.map(
                (experience_level: FilterCheckboxType, index: number) => (
                  <FilterCheckbox
                    key={experience_level.id}
                    id={experience_level.id}
                    label={experience_level.label}
                    checked={
                      experienceLevelTypes[
                        experience_level.id as keyof ExperienceLevelTypes
                      ]
                    }
                    onCheckedChange={() => {
                      setExperienceLevelTypes((prev) => {
                        return {
                          ...prev,
                          [experience_level.id]:
                            !prev[
                              experience_level.id as keyof ExperienceLevelTypes
                            ],
                        };
                      });
                    }}
                    isLastItem={
                      index === EXPERIENCE_LEVEL.length - 1 ? true : false
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-10/12 h-full">
          {jobs.map((job) => (
            <JobApplication key={job.job_id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
