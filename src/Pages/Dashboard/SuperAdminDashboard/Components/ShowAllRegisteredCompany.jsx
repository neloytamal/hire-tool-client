import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../../../Shared/Loading";

const ShowAllRegisteredCompany = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState({});
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://elegant-bd-jobs.onrender.com/superadmin-get-all-company"
        );
        const data = response.data;
        const mew = [];
        console.log(data);
        data.forEach((k) => {
          if (k?.approval == true && k?.isRejected === "2") {
            mew.push(k);
            console.log(k);
          }
        });

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
  }, [deleteButtonClicked]);

  const handleShowCompanyDetails = async (uid) => {
    setModalLoading(true);
    window.my_modal_3.showModal();
    try {
      const response = await axios.get(
        `https://elegant-bd-jobs.onrender.com/get-company-details/${uid}`
      );
      const data = response.data;
      setShowCompanyDetails(data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteCompany = async (uid) => {
    setDeleteButtonClicked(true);
    try {
      console.log(uid);
      // eslint-disable-next-line no-unused-vars
      const result = await axios.delete(
        `https://elegant-bd-jobs.onrender.com/delete-single-company-bysuperadmin/${uid}`
      );
      // eslint-disable-next-line no-unused-vars, no-undef
      const data = result.data;
      // eslint-disable-next-line no-undef
      console.log(result);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setDeleteButtonClicked(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : companies?.length === 0 ? (
        <p>No registered company</p>
      ) : (
        <div className="overflow-x-auto">
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
            Registered Companies
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
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{company?.companyName} </td>

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
                  <td className="join">
                    <button
                      onClick={() => handleShowCompanyDetails(company.uid)}
                      className="btn-stroked btn-sm">
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(company.uid)}
                      className="btn btn-outline btn-error text-[16px] font-medium normal-case btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalLoading ? (
            <dialog id="my_modal_3" className="modal">
              <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <span className="loading loading-spinner loading-md"></span>
              </form>
            </dialog>
          ) : (
            <dialog id="my_modal_3" className="modal">
              <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <h3 className="font-bold text-lg"></h3>
                <p className="pb-2">
                  Company 
                  <span className="font-extrabold">
                    {" "}
                    {showCompanyDetails?.companyName}
                  </span>
                </p>
                <p className="pt-4 pb-2 font-medium">
                  Approval details: {showCompanyDetails?.approval}
                </p>
                <p>uid {showCompanyDetails?.uid}</p>
                <p>email {showCompanyDetails?.email}</p>
              </form>
            </dialog>
          )}
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ShowAllRegisteredCompany;
