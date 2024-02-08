import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import JobSection from "./components/JobSection";
import { job } from "../../../types/jobs";
function Home() {
  const [Jobs, SetJobs] = useState<job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("http://localhost:8000/jobs", {
        method: "GET",
      });
      const data: job[] = await res.json();
      return data;
    };
    fetchJobs().then((data: any) => {
      SetJobs(data);
    });
  }, []);
  return (
    <div>
      <Hero />
      <div className="mt-4 flex flex-col gap-y-8">
        {Jobs.map((job, index) => {
          return (
            <JobSection
              key={index}
              _id={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              isAdmin={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
