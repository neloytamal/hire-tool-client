/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import { JobContext } from "../../../../Context/JobsProvider";
import Loading from "../../../Shared/Loading";

const ShowEmployeeDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resetButtonLoading, setResetButtonLoading] = useState(false);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const { user } = useContext(AuthContext); //company data here you have company uid
  const { selectedJobForShowEmployeeDetailsPage } = useContext(JobContext); // here we probably have job _id
  const [buttonDisable, setButtonDisable] = useState(false);
  let params = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      // Retrieve the email from local storage
      const email = localStorage.getItem("selectedEmployeeEmail");

      if (email) {
        try {
          // Send a request to the API endpoint with the email
          const response = await axios.get(
            `https://elegant-bd-jobs.onrender.com/get-single-user-info?email=${params.email}`
          );
          const employeeData = response.data;
          console.log(employeeData);
          setEmployee(employeeData);

          // const responseEmployee = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-employee-info?employeeUID=${response.data.uid}`)
          // console.log("let button disable employee data",responseEmployee.data)
          // responseEmployee.data.calledForInterview.forEach((interview) => {
          //     if (interview?.job_id===selectedJobForShowEmployeeDetailsPage) {
          //       // console.log("job mongo id is ",interview?.job_id);
          //       setButtonDisable(true)
          //     }
          // });

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleBackButtonClick = () => {
    // Remove the data from local storage
    localStorage.removeItem("selectedEmployeeEmail");
    // Navigate user to previous page
    navigate(-1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      employeeUID: employee.uid,
      interviewTime: {
        interviewDate: interviewDate,
        interviewTime: interviewTime,
      },
      companyUID: user.uid,
      job_id: selectedJobForShowEmployeeDetailsPage,
    };
    // eslint-disable-next-line no-unused-vars
    const result = await axios.put(
      "https://elegant-bd-jobs.onrender.com/update-add-an-array",
      data
    );
    console.log("Interview Date:", interviewDate);
    console.log("Interview Time:", interviewTime);
    console.log(
      "job id from employee details page:",
      selectedJobForShowEmployeeDetailsPage
    );
    console.log(result.status);
    if (result.status == 200) {
      setButtonDisable(true);
    }
  };

  const handleRemoveButtonClick = async () => {
    setResetButtonLoading(true); // Set loading state
    try {
      const data = {
        employeeUID: employee.uid,
        job_id: selectedJobForShowEmployeeDetailsPage,
        companyUID: user.uid,
      };
      const result = await axios.put(
        "https://elegant-bd-jobs.onrender.com/remove-array-item",
        data
      );
      console.log("Remove result:", result.data);
      // Add any additional logic after removing the item
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setResetButtonLoading(false); // Reset loading state
    }
  };

  console.log(employee);
  return (
    <div className="flex justify-center flex-col items-center">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
            Employee Details
          </p>

          <div className=" p-10 card-style w-[40vw]">
            <p className="capitalize">
              {employee.role}{" "}
              <span className="font-semibold">{employee.displayName}</span>
            </p>
            <p>
              Email:{" "}
              {employee.email || (
                <span className="italic">Email Undefined</span>
              )}
            </p>
            <p>
              Phone:{" "}
              {employee?.phone || (
                <span className="italic">no phone number found</span>
              )}
            </p>
            <p>Job Title: {employee.desiredJobTitle}</p>
            <p>
              Address:{" "}
              {employee.address || (
                <span className="italic">no location defined</span>
              )}
            </p>
            <p>
              Skills:
              {employee.keySkills === 0 ? (
                <span className="italic">Undefined</span>
              ) : (
                employee.keySkills.map((skill, index) => (
                  <span className="badge-ghost mx-1 px-2" key={index}>
                    {skill}
                  </span>
                ))
              )}
            </p>
            <p className="flex mt-3">
              Job History:
              <p className="grid grid-cols-3 gap-2">
                {employee.workExperience.jobHistory.map((singleJob, index) => (
                  <li key={index} type="1" className="px-2">
                    <p>Company: {singleJob.company}</p>
                    <p>Joined In: {singleJob.employmentStartDate}</p>
                    <p>Left in: {singleJob.employmentStartDate}</p>
                  </li>
                ))}
              </p>
            </p>
            <p className="flex mt-3">
              Education:
              <p className="grid grid-cols-3 gap-2">
                {employee.workExperience.education.map((edu, index) => (
                  <li key={index} type="1" className="px-2">
                    <p>institution: {edu.institution}</p>
                    <p>Degree: {edu.degree}</p>
                    <p>Graduation Date: {edu.graduationDate}</p>
                  </li>
                ))}
              </p>
            </p>
            <hr className="my-5" />

            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="interviewDate">Interview Date: </label>
                <input
                  type="date"
                  id="interviewDate"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="input input-bordered m-2 mb-5"
                />
              </div>
              <div>
                <label htmlFor="interviewTime">Interview Time: </label>
                <input
                  type="time"
                  id="interviewTime"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="input input-bordered m-2 mb-5"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  {buttonDisable ? (
                    <button
                      disabled
                      className="btn bg-primary w-full text-base-100 normal-case text-[16px] font-medium border-none hover:bg-neutral transition-all"
                      type="submit">
                      Submit
                    </button>
                  ) : (
                    <button
                      className="btn bg-primary w-full text-base-100 normal-case text-[16px] font-medium border-none hover:bg-neutral transition-all"
                      type="submit">
                      Submit
                    </button>
                  )}
                </div>

                <div>
                  <button
                    className="btn-stroked w-full"
                    onClick={handleBackButtonClick}>
                    Back
                  </button>
                </div>

                <div>
                  {resetButtonLoading ? (
                    <button
                      className="btn-stroked w-full"
                      onClick={handleRemoveButtonClick}>
                      <span className="loading loading-dots loading-sm"></span>
                    </button>
                  ) : (
                    <button
                      className="normal-case w-full text-[16] btn btn-outline btn-error"
                      onClick={handleRemoveButtonClick}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowEmployeeDetails;
