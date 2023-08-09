import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import Notification from "./Notification/Notification";
import Loading from "../../../Shared/Loading";

const EmployeeNotifications = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [employeeNotification, setEmployeeNotification] = useState([]);
  const [interviewWith, setInterviewWith] = useState([])

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-employee/${uid}`);

        // console.log(response.data?.payload?.employee)
        const updatedDoc = {previousNotificationCount: response.data?.payload?.employee.calledForInterview?.length}
        const x = await axios.patch(`https://elegant-bd-jobs.onrender.com/update-single-employee/${uid}`,updatedDoc)
                                    .then((y)=>{
                                      console.log(y.data.modifiedCount)
                                      if (y.data.modifiedCount!==0) {
                                        localStorage.removeItem("badge")
                                      }
                                    })

        // console.log(x.modifiedCount)



        setEmployeeNotification(response.data?.payload?.employee?.calledForInterview || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [uid]);

  useEffect(() => {
    const fetchCompanyData = async () => {



      try {
        // let companyArray = []
        setLoading(true);


        // eslint-disable-next-line no-unused-vars
        const companiesData = await Promise.all(
          employeeNotification.map(async (company) => {
            const Ccompany = await axios.get(`https://elegant-bd-jobs.onrender.com/get-company-details/${company.appointmentCompanyUID}`);
            const job = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-job-details-employee/${company.job_id}`);
            let data = {
              company:Ccompany.data,
              job:job.data,
              interviewTime:company.interviewTime
            }
            localStorage.removeItem("badge")
            console.log(company)
            return data;
          })
        );
        // Do something with the companiesData array (e.g., set state)
        setInterviewWith(companiesData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [employeeNotification]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        interviewWith.map((interviewWith, index) => (
          <Notification
            interviewWith={interviewWith}
            key={index}
          ></Notification>
        ))
      )}
    </div>
  );
  
};

export default EmployeeNotifications;
