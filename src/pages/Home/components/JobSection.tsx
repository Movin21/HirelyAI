import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
interface JobCardProps {
  _id: String;
  title: String;
  type: String;
  location: String;
  isAdmin: boolean;
}
const JobSection = (props: JobCardProps) => {
  return (
    <Link to={props.isAdmin ? `/admin/job/${props._id}` : `/job/${props._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardFooter className="gap-x-4">
          <div className=" flex items-center gap-x-2">
            <Briefcase />
            <span>{props.type} </span>
          </div>
          <div className=" flex items-center gap-x-2">
            <MapPin />
            <span> {props.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobSection;
