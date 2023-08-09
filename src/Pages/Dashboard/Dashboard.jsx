import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard/SuperAdminDashboard";
import Loading from "../Shared/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("employee")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://elegant-bd-jobs.onrender.com/user-type?uid=${user.uid}`);
        const data = await response.json();
        const companyInfo = await axios.get(`https://elegant-bd-jobs.onrender.com/get-company-details/${user.uid}`).then(ci=>{
          if (ci.data.isRejected !== "2" && data.role==="company") {
            navigate("/approval")
          }
        })
        // console.log(companyInfo.data.)
        // Process the retrieved data here
        console.log(data.role);
        setRole(data.role)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when API call is finished
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Perform clean-up tasks if needed
    };
  }, []);

//   const role="company"

  return (
    <div>
    {isLoading ? (
      <Loading></Loading>
    ) : (
      <>
        {role === "superAdmin" ? (
          <SuperAdminDashboard />
        ) : role === "company" ? (
          <CompanyDashboard />
        ) : (
          <EmployeeDashboard />
        )}
      </>
    )}
  </div>
  );
};

export default Dashboard;
