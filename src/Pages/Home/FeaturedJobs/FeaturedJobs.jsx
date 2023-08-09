import "react";
import { useContext, useState } from "react";
import Job from "./Job";
import { Link } from "react-router-dom";
import { JobContext } from "../../../Context/JobsProvider";
import { useEffect } from "react";

const FeaturedJobs =() => {
  const {fetchAllJobs} = useContext(JobContext);
  const [ jobs, setJobs ] = useState([]);
 
  useEffect(() => {
    const fetchJobs = async () =>{
      const jobs = await fetchAllJobs()
      setJobs(jobs.data)
    }
    fetchJobs()
    return () => {
      
    }
  }, [])

  return (
    <div className="min-h-screen">
    <div className="md:w-4/5 lg:w-3/5 sm:w-full mx-auto justify-center flex flex-col items-center py-[10rem] px-4">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Featured jobs
      </p>
      <div className="grid gap-5 w-full">
        {jobs.reverse().slice(0, 3).map((job) => (
          <Job
            company={job?.companyName || <span className="italic">Company Name Undefined</span>}
            key={job?._id}
            description={job?.jobDescription || <span className="italic">Description Undefined</span>}
            category={job?.categories || <span className="italic">Category Undefined</span>}
            location={job?.location || <span className="italic">Location Undefined</span>}
            requirements={job.requirements}
            title={job.jobTitle}
            _id={job?._id}
          ></Job>
        ))}
      </div>
      <Link to='/show-all-jobs' className="btnOnlyText mt-10">See more jobs</Link>
    </div>
  </div>
  );
};

export default FeaturedJobs;
