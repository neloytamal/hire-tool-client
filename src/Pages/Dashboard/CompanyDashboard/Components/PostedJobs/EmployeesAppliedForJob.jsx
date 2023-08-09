import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../../../Context/JobsProvider";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../Shared/Loading";

const EmployeesAppliedForJob = () => {
  // eslint-disable-next-line no-unused-vars
  const { getEmployeesWhoAppliedForThisJob } = useContext(JobContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const appliedEmployees = await getEmployeesWhoAppliedForThisJob();
        setEmployeeData(appliedEmployees);
        setIsLoading(false);
        console.log(appliedEmployees);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleButtonOnlick = (email) => {
    localStorage.setItem("selectedEmployeeEmail", email);
    navigate(`/dashboard/show-employee-details/${email}`);
  };

  return (
    <div>
      <p className="text-xl mb-8">
      {employeeData?.length} person applied for this jobs
      </p>
      

      <div className="flex">
        {" "}
        {employeeData.map((employee) => (
          <div key={employee.uid}>
            <button
              onClick={() => handleButtonOnlick(employee.email)}
              className="btn-style m-1">
              {employee.email}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesAppliedForJob;
