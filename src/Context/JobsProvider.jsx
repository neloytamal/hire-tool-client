/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Loading from "../Pages/Shared/Loading";

export const JobContext = createContext();

const JobsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [employeesWhoAppliedForThisJob, setEmployeesWhoAppliedForThisJob] = useState()
  const [myCompanyPostedJobs, setMyCompanyPostedJobs] = useState();
  const [selectedJobForShowEmployeeDetailsPage, setSelectedJobForShowEmployeeDetailsPage] = useState()

  const getMyCompanyPostedJobs = async () => {
    try {
      const response = await axios.get("https://elegant-bd-jobs.onrender.com/show-all-jobs");
      const filteredJobs = response.data.filter((job) =>
        job.uid.includes(user.uid)
      );
      setMyCompanyPostedJobs(filteredJobs);
      console.log(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeesWhoAppliedForThisJob =async () =>{
    const employeeDataArray = [];
        for (const appliedEmployeeUID of employeesWhoAppliedForThisJob) {
            try {
                const response = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-user-info?uid=${appliedEmployeeUID}`);
                const userData = response.data;
                employeeDataArray.push(userData);
            } catch (error) {
                console.error(`Error fetching user data for UID ${appliedEmployeeUID}:`, error);
            }
        }
        return employeeDataArray
  }

  const fetchAllJobs = async (filter=null) => {
    if (filter===null) {
      return await axios.get("https://elegant-bd-jobs.onrender.com/show-all-jobs");
    }
  }

  const jobInfo = {
    getMyCompanyPostedJobs,
    setSelectedJobForShowEmployeeDetailsPage,
    selectedJobForShowEmployeeDetailsPage,
    myCompanyPostedJobs,
    getEmployeesWhoAppliedForThisJob,
    setEmployeesWhoAppliedForThisJob,
    employeesWhoAppliedForThisJob,
    fetchAllJobs
  };

  if (loading == true) {
    return <Loading></Loading>;
  }
  return <JobContext.Provider value={jobInfo}>{children}</JobContext.Provider>;
};

export default JobsProvider;
