import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jobSection } from "../../../types/jobSection";
import { Progress } from "@/components/ui/progress";

function JobPage() {
  const { id } = useParams();

  console.log(id); //Gives us the value of the route param.

  const [JobSection, setJobSection] = useState<jobSection>();

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: "GET",
      });
      const data: jobSection = await res.json();
      return data;
    };
    fetchJobs().then((data: any) => {
      setJobSection(data);
    });
  }, [id]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      {!JobSection ? (
        <>
          <Progress value={33} />
        </>
      ) : (
        <div>
          <div>
            <h2>{JobSection.title}</h2>
            <div className="flex items-center gap-x-4 mt-4">
              <div className="flex items-center gap-x-2">
                <Briefcase />
                <span>{JobSection.type}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <MapPin />
                <span>{JobSection.location}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 py-4">
            <p>{JobSection.description}</p>
          </div>
          <Separator />
          <form className="py-8" onSubmit={handleSubmit}>
            <div>
              <h3>Full Name</h3>
              <Input
                className="mt-2"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            {JobSection.Questions &&
              JobSection.Questions.map((question: String, i: number) => {
                return (
                  <div key={i} className="mt-4">
                    <h3>{question}</h3>
                    <Textarea
                      className="mt-2"
                      name={`a${i + 1}`}
                      required
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            <Button type="submit" className="mt-8 bg-card text-card-foreground">
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default JobPage;
