import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ShowAllPendingCompany = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [showCompanyDetails, setShowCompanyDetails] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [approvedButtonPressed, setApprovedButtonPressed] = useState(false);
  const [disableApproveRejectButton, setDisableApproveRejectButton] =
    useState(false);
  const [clickRejectedButton, setClickRejectedButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://elegant-bd-jobs.onrender.com/superadmin-get-all-company"
        );
        const data = response.data;
        const mew = [];
        data.forEach((k) => {
          console.log("k = ", k?.approval);
          if (!k?.approval && k?.isRejected === "0") {
            console.log(k);
            mew.push(k);
          }
        });
        // console.log(mew)

        setCompanies(mew);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDisableApproveRejectButton(true);
        setApprovedButtonPressed(false);
        setClickRejectedButton(false);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Perform clean-up tasks if needed
    };
  }, [approvedButtonPressed, clickRejectedButton]);

  const handleCompanyDetails = async (uid) => {
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

  const handleCompanyApprovalAccept = async (uid) => {
    setModalLoading(true); // Set loading to true when starting to update company approval/rejection

    try {
      const result = await axios.put(
        `https://elegant-bd-jobs.onrender.com/update-single-company/${uid}`,
        { approval: true, isRejected: "2" }
      );
      if (result.data.acknowledged) {
        toast.success("Successfully toasted!");
      }
      setIsLoading(false); // Set loading to false when the API call is complete
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setModalLoading(false);
      setApprovedButtonPressed(true);
      window.my_modal_3.showModal();
      setDisableApproveRejectButton(true);
    }
  };

  const handleCompanyApprovalReject = async (uid) => {
    setDisableApproveRejectButton(true);
    setClickRejectedButton(true);
    setModalLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await axios.put(
        `https://elegant-bd-jobs.onrender.com/update-single-company/${uid}`,
        { approval: false, isRejected: "1" }
      );
      // Handle the result if needed
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : companies?.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        //     <div className="overflow-x-auto">
        //     <table className="table">
        //       <thead>
        //         <tr>
        //           <th>Index</th>
        //           <th>Company Name</th>
        //           <th>Registration ID</th>
        //           <th>Website</th>
        //           <th>Address</th>
        //           <th>Phone Number</th>
        //           <th></th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //           {

        //           }
        //         {companies.map((company, index) => (
        //           <tr key={index}>
        //               <td>{index+1}</td>
        //             <td>
        //               <div className="flex items-center space-x-3">
        //                 <div className="avatar">
        //                   <div className="mask mask-squircle w-12 h-12">
        //                     <img srcSet={company?.companyLogo} alt="No image to display" />
        //                   </div>
        //                 </div>
        //                 <div>
        //                        <p className="font-bold">{company?.companyName}</p>
        //                 </div>
        //               </div>
        //             </td>

        //             <td>{company?.registerID}</td>
        //             <td>
        //               <button className="btn btn-ghost btn-xs">{company.website.toLowerCase()}</button>
        //             </td>
        //             <td>
        //               <button className="btn btn-ghost btn-xs">{company.locations}</button>
        //             </td>
        //             <td>
        //               <button className="btn btn-ghost btn-xs">{company.phone}</button>
        //             </td>
        //             <td>
        //               <button onClick={()=>handleCompanyDetails(company.uid)} className="btn btn-outline btn-accent">Details {company.uid}</button>
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>

        //  {
        //   modalLoading ?
        //   <dialog id="my_modal_3" className="modal">
        //   <form method="dialog" className="modal-box">
        //       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        //       <span className="loading loading-spinner loading-md"></span>
        //   </form>
        //   </dialog>
        //   :
        //   <dialog id="my_modal_3" className="modal">
        //   <form method="dialog" className="modal-box">
        //       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        //       <h3 className="font-bold text-lg"></h3>
        //       <p className="py-4">Company name <span className="font-extrabold"> {showCompanyDetails?.companyName}</span></p>
        //       <p className="py-4">approval details {showCompanyDetails?.approval}</p>
        //       <p className="py-4">uid {showCompanyDetails?.uid}</p>
        //       <p className="py-4">email {showCompanyDetails?.email}</p>
        //       <button onClick={()=>handleCompanyApprovalAccept(showCompanyDetails.uid)} className={!showCompanyDetails?.approval ? "btn btn-outline btn-success" : "btn btn-disabled"} >Accept</button>
        //       <button onClick={()=>handleCompanyApprovalReject(showCompanyDetails.uid)} className={`${disableApproveRejectButton} ? btn btn-outline btn-error : btn btn-outline btn-error ` } >Reject</button>
        //   </form>
        // </dialog>
        //  }
        //   </div>

        <div className="overflow-x-auto">
          <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
            Pending Companies
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
                  <td className="font-medium">{company?.companyName}</td>

                  <td>{company?.registerID}</td>
                  <td>{company.website.toLowerCase()}</td>
                  <td>{company.locations}</td>
                  <td>{company.phone}</td>
                  <td>
                    <button
                      onClick={() => handleCompanyDetails(company.uid)}
                      className="btn-sm btn-stroked">
                      Details
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
                <p className="py-1">
                  Company:{" "}
                  <span className="font-extrabold">
                    {" "}
                    {showCompanyDetails?.companyName}
                  </span>
                </p>
                <p className="pt-3">
                  Approval details: {showCompanyDetails?.approval}
                </p>
                <p className="py-1">Email {showCompanyDetails?.email}</p>
                <div className="mt-4">
                <button
                  onClick={() =>
                    handleCompanyApprovalAccept(showCompanyDetails.uid)
                  }
                  className={
                    !showCompanyDetails?.approval
                      ? "btn-style btn-success mr-1"
                      : "btn-style btn-disabled mr-1"
                  }>
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleCompanyApprovalReject(showCompanyDetails.uid)
                  }
                  className={
                    !disableApproveRejectButton
                      ? "btn btn-outline btn-error text-primary px-5 text-[16px] font-medium normal-case ml-1"
                      : "btn btn-outline btn-error text-primary px-5 text-[16px] font-medium normal-case ml-1"
                  }>
                  Reject
                </button>
                </div>
              </form>
            </dialog>
          )}
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ShowAllPendingCompany;
