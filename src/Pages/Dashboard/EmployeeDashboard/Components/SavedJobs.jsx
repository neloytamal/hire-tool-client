/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading";

const SavedJobs = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-single-employee/${uid}`
        );
        setEmployeeData(response.data.payload.employee);
        const employeeSavedJobs = response.data.payload.employee.savedJobs;
        let arr = [];

        if (employeeSavedJobs?.length === 0) {
          setSavedJobs(null);
        } else {
          await Promise.all(
            employeeSavedJobs?.map(async (job) => {
              const res = await axios.get(
                `https://elegant-bd-jobs.onrender.com/get-all-saved-jobs/${job}`
              );
              console.log(res);
              arr.push(res.data);
            })
          );
        }

        setSavedJobs(arr);

        console.log("arr is ", arr);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [uid]);

  const handleShowDetails = (_id) => {
    console.log(_id);
    navigate(`/${_id}`);
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
            Saved Jobs
          </p>
          <div className="grid grid-cols-4 gap-4">
            {savedJobs.map((savedJob, index) => (
               <div className="card-body card-style" key={index}>
                 <h2 className="card-title font-bold text-black">
                   {savedJob.jobTitle}
                 </h2>
                 <p className="text-black">{savedJob.jobDescription}</p>
                 <p className="text-black">Last day to apply: {savedJob.postedDate || <span className="italic">Undefined</span>}</p>
                <div className="card-actions justify-end mt-8 w-full">
                  <button onClick={() => handleShowDetails(savedJob._id)} className="btn-stroked w-full">Show details</button>
                 </div>
              </div>
              // console.log(savedJob.postedDate,index)
            ))}
          </div>
          {/* Display employeeData or other content */}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
