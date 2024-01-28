import Hero from "./components/Hero";
import JobSection from "./components/JobSection";

function Home() {
  const jobs = [
    {
      _id: "xyz",
      title: "Intern - Software Engineer",
      type: "Full-time",
      location: "Remote",
      isAdmin: false,
    },
    {
      _id: "abc",
      title: "Software Engineer",
      type: "Full-time",
      location: "Remote",
      isAdmin: false,
    },
  ];
  return (
    <div>
      <Hero />
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobSection
              key={job._id}
              _id={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              isAdmin={job.isAdmin}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
