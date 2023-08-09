/* eslint-disable react/prop-types */
import "react";
import { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { JobContext } from "../../../../../Context/JobsProvider";
import axios from "axios";
import { AuthContext } from "../../../../../Context/AuthProvider";

const PostedJob = ({ job }) => {
  const { _id, jobTitle, whoApplied, jobDescription, requirements } = job;
  const {
    setEmployeesWhoAppliedForThisJob,
    setSelectedJobForShowEmployeeDetailsPage,
  } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(job)

  const handleOnClick = () => {
    // console.log(whoApplied)
    if (whoApplied?.length === 0) {
      // console.log("array length is zero")
      toast.error("No one applied for this job.");
    } else {
      // localStorage.setItem('whoApplied', JSON.stringify(whoApplied));
      setEmployeesWhoAppliedForThisJob(whoApplied);
      setSelectedJobForShowEmployeeDetailsPage(_id);
    }
  };

  const handleDeleteJob = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.delete(
        `https://elegant-bd-jobs.onrender.com/delete-a-job?job_id=${_id}&companyUID=${user.uid}`
      );

      console.log("Deleted job:", response);

      // Perform any necessary actions after successful deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
      window.location.reload(); // Refresh the page
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border-[1px] p-7 px-10 m-2 w-[65vw]">
        <p>
          {" "}
          <strong>Job title:</strong> {jobTitle}
        </p>
        <p className="mt-2">
           {jobDescription}
        </p>
        <p className="mt-2">
           <strong>Requirements:</strong> {requirements.map((requirement, index) => 
           <li key={index}>{requirement}</li>
           )}
        </p>

      <div className="mt-7">
      <button className="btn-style btn-error"onClick={handleDeleteJob}>Delete this job</button>
        {whoApplied?.length === 0 ? (
          <Link to="/dashboard/show-who-applied">
            <button
              disabled
              onClick={handleOnClick}
              className="text-gray-400 px-5 normal-case text-[16px] font-medium ">
              Show who applied for this jobs{" "}
              <div className="badge badge-secondary p-1 px-2">{whoApplied?.length}</div>
            </button>
          </Link>
        ) : (
          <Link to="/dashboard/show-who-applied">
            <button
              onClick={handleOnClick}
              className="btnOnlyText hover:underline">
              Show who applied for this jobs{" "}
              <div className="badge badge-ghost p-1 px-2">{whoApplied?.length}</div>
            </button>
          </Link>
        )}{" "}
      </div>
        <Toaster />
      </div>
    </div>
  );
};

export default PostedJob;
