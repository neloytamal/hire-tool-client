import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../Context/AuthProvider";
import CompanyNotification from "./CompanyNotification";
import Loading from "../../../../Shared/Loading";

const CompanyInfoComponent = () => {
  const [dataForNotifications, setDataForNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://elegant-bd-jobs.onrender.com/notification");
        const companies = response.data.resultCompany;
        const company = companies.find((c) => c.uid === user.uid);
        console.log(company)
        setDataForNotifications(company.appointmentDetails);
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched or if there's an error
      }
    };

    fetchData(); // Initial API call

    const interval = setInterval(fetchData, 30000); // API call every 1 minutes

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading></Loading> // Show loading indicator only for the initial API call
      ) : (
        <div>
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
            Notifications
          </p>
        <div className="grid grid-cols-4 gap-5">
        {dataForNotifications.map((notification, i) => {
            return (
              <CompanyNotification
                key={i}
                index={i}
                notification={notification}></CompanyNotification>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfoComponent;
