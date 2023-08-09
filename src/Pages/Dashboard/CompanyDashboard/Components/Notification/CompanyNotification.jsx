/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../../Shared/Loading";

const CompanyNotification = (props) => {
  const { appointmentEmployeeUID, interviewTime, job_id } = props.notification;
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({});
  const currentDate = new Date();
  const interviewDate = new Date(interviewTime.interviewDate);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-single-employee-for-company?employeeUID=${appointmentEmployeeUID}`
        );
        const jobResponse = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-single-job?_id=${job_id}`
        );
        const data = response.data;
        setJob(jobResponse.data);
        setEmployeeData(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [appointmentEmployeeUID]);

  // Function to format the time as "1:21 AM"
  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  // Function to format the date as "12 June, 2021"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className={interviewDate > currentDate + 1 ? "bg-red-500" : ""}>
          {/* Render employee data */}
          {/* {employeeData && ( */}
            <div className="card-style p-5">
              <p>Employee Email: {employeeData?.email}</p>
              <p>Job title: {job?.jobTitle}</p>
              <p>Interview Time: {formatTime(interviewTime?.interviewTime)}</p>
              <p>Interview Date: {formatDate(interviewTime?.interviewDate)}</p>
            </div>
            {/* Add more employee data fields as needed */}
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default CompanyNotification;
