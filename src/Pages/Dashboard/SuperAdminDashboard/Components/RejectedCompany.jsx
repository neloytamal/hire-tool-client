import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../../../Shared/Loading";

const RejectedCompany = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [approvedButtonPressed, setApprovedButtonPressed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://elegant-bd-jobs.onrender.com/superadmin-get-all-company"
        );
        const data = response.data;
        const mew = [];
        data.forEach((k) => {
          console.log("k = ", k?.approval);
          if (!k?.approval && k.isRejected === "1") {
            console.log(k);
            mew.push(k);
          }
        });
        // console.log(mew)

        setCompanies(mew);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Perform clean-up tasks if needed
    };
  }, [approvedButtonPressed]);

  const handleRejectToApproved = async (uid) => {
    setApprovedButtonPressed(true);
    try {
      const response = await axios.get(
        `https://elegant-bd-jobs.onrender.com/get-company-details/${uid}`
      );
      // eslint-disable-next-line no-unused-vars
      const result = await axios.put(
        `https://elegant-bd-jobs.onrender.com/update-single-company/${uid}`,
        { approval: true, isRejected: "2" }
      );
      // eslint-disable-next-line no-unused-vars
      const data = response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setApprovedButtonPressed(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : companies?.length === 0 ? (
        <p>No rejected companies</p>
      ) : (
        <div className="overflow-x-auto">
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
            Rejected Companies
          </p>
          <table className="table table-md">
            <thead>
              <tr className="text-[15px] capitalize text-black">
                <th>Index</th>
                <th>Company Name</th>
                <th>Registration ID</th>
                <th>Website</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {}
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{company?.companyName}</p>
                  </td>

                  <td>{company?.registerID}</td>
                  <td>
                      {company.website.toLowerCase()}
                  </td>
                  <td>
                      {company.locations}
                  </td>
                  <td>
                      {company.phone}
                  </td>
                  <td>
                    <button
                      onClick={() => handleRejectToApproved(company.uid)}
                      className="btn btn-success normal-case btn-outline btn-sm">
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default RejectedCompany;
