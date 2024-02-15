import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "./components/JobApplicationCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
type jobApplicationCard = {
  key: any;
  fullName: any;
  _id: any;
  jobId: any;
};

function JobPage() {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState({
    _id: "",
    title: "",
    description: "",
    type: "",
    location: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    };

    fetchJobs().then((data) => {
      setJob(data);
    });
  }, []);

  const [jobApplications, setjobApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(
        `http://localhost:8000/jobApplications/admin/${id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      return data;
    };

    fetchJobs().then((data) => {
      console.log(data);
      setjobApplications(data);
    });
  }, []);

  return (
    <div>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job.location}</span>
          </div>
        </div>
        {/* <div className="gap-x-4 flex items-center mt-4">
          <Badge>NodeJS</Badge>
          <Badge>ReactJS</Badge>
          <Badge>AWS</Badge>
        </div> */}
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application: jobApplicationCard) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={application.jobId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
