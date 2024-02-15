import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Import statements...

type JobApplication = {
  userId: string;
  fullName: string;
  job: string;
  answers: string[];
  rating: string;
};

function AdminJobApplicationPage() {
  const { applicationId } = useParams();
  const [jobApplication, setJobApplication] = useState<
    JobApplication | undefined
  >();

  useEffect(() => {
    const fetchJobApplication = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/jobApplications/${applicationId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch job application");
        }
        const data = await res.json();
        setJobApplication(data);
      } catch (error) {
        console.error("Error fetching job application:", error);
      }
    };

    fetchJobApplication();
  }, []);

  if (!jobApplication) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication.fullName}</CardTitle>
          <Badge
            className={cn({
              "bg-red-500": jobApplication.rating?.toLowerCase() === "bad",
              "bg-orange-400":
                jobApplication.rating?.toLowerCase() === "moderate",
              "bg-teal-500": jobApplication.rating?.toLowerCase() === "good",
            })}
          >
            {jobApplication.rating}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-4">
        {jobApplication.answers.map((answer, i) => (
          <p key={i}>{answer}</p>
        ))}
      </Card>
      <div>
        <Button variant="link" asChild>
          <Link to="/admin/jobs">Back</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminJobApplicationPage;
