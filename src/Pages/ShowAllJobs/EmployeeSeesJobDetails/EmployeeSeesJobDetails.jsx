/* eslint-disable no-unused-vars */
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Loading from "../../Shared/Loading";
import { Toaster, toast } from "react-hot-toast";

const EmployeeSeesJobDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const param = useParams();
  const { _id } = param;
  const { uid } = user;
  const [applyStatus, setApplyStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({});
  const [getPostedJobsByThisCompany, setGetPostedJobsByThisCompany] = useState(
    []
  );
  const [needToRender, setNeedToRender] = useState(false);
  const [
    loadingPostOtherJobsByThisCompany,
    setLoadingPostOtherJobsByThisCompany,
  ] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoadingPostOtherJobsByThisCompany(true);
        const id = param._id;
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-single-job-details-employee/${id}`
        );
        setJobDetails(response.data);
        const getCompanyDetails = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-company-for-employee/${response.data.uid}`
        );
        setCompanyDetails(getCompanyDetails.data);
        const getPostedJobsByThisCompanyk = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-other-posted-jobs-by-this-company/${getCompanyDetails.data.uid}`
        );
        setGetPostedJobsByThisCompany(getPostedJobsByThisCompanyk.data);
        console.log(getPostedJobsByThisCompanyk.data);
      } catch (error) {
        console.error(error);
      } finally {
        setNeedToRender(false);
        setLoadingPostOtherJobsByThisCompany(false);
      }
    };

    fetchJobData();
  }, [needToRender]);

  useEffect(() => {
    
    if (applyStatus === "success") {
        toast.success('Successfully applied!')
    }else if (applyStatus === "warning"){
        toast.error("You already applied")
    }

   
  }, [applyStatus]);

  if (!jobDetails) {
    return <Loading></Loading>;
  }

  const {
    salaryRange,
    jobTitle,
    location,
    postedDate,
    jobDescription,
    industry,
    experienceLevel,
    companyName,
    categories,
    requirements,
    responsibilities,
  } = jobDetails;

  const handleApplyJob = async () => {
    // const applyData = {
    //   _id: _id,
    //   applyStatus: false,
    // };

    const response = await axios.post(
      "https://elegant-bd-jobs.onrender.com/set-employee-apply-job",
      { _id, uid }
    ).then(response => {

        if (response.data === "UpdatedJob") {
            setApplyStatus("success");
          } else if (response.data === "You already applied here...") {
            setApplyStatus("warning");
          } 
    })
    
  };

  const handleShowDetails = (_id) => {
    console.log(_id);
    setNeedToRender(true);
    navigate(`/${_id}`);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="card-style p-7 max-w-[40rem]">
          <p className="text-primary font-semibold text-xl">{jobTitle}</p>
          <div className="mt-5">
            <p>Company: {companyDetails?.companyName}</p>
            <p>
              Location: {location || <span className="italic">Undefined</span>}
            </p>
            <p>
              Industry:{" "}
              {companyDetails?.industry || (
                <span className="italic">Undefined</span>
              )}
            </p>
            <p>
              Categories:{" "}
              {categories || <span className="italic">Undefined</span>}
            </p>
            <p>
              Experience Level:{" "}
              {experienceLevel || <span className="italic">Undefined</span>}
            </p>
          </div>
          <div className="mt-3">
            <p>
              Description:{" "}
              {jobDescription || <span className="italic">Undefined</span>}
            </p>
          </div>
          <div className="mt-3">
            <p>
              Requirements:{" "}
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              )) || <span className="italic">Undefined</span>}
            </p>
          </div>
          <div className="mt-3">
            <p>
              Responsibilities:{" "}
              {responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              )) || <span className="italic">Undefined</span>}
            </p>
          </div>
          <div className="mt-3">
            <p>Last date to apply: {postedDate}</p>
            <p>Salary: {salaryRange}</p>
          </div>
          <div className="mt-4"></div>
          <button onClick={handleApplyJob} className="btn-style">Apply job</button>
        </div>
        {getPostedJobsByThisCompany?.length > 0 && (
          <p className="mt-5 font-semibold underline">
            Scroll Down to see other jobs by {companyDetails?.companyName}
          </p>
        )}
      </div>

      {loadingPostOtherJobsByThisCompany ? (
        <Loading></Loading>
      ) : (
        getPostedJobsByThisCompany?.jobTitle != jobTitle && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-[70vw] mx-auto mb-20">
            {getPostedJobsByThisCompany.map((postedJob, index) => (
              <div
                key={index}
                className="w-full card-style border-[1px] m-3 text-primary-content flex flex-col h-full">
                <div className="card-body">
                  <h2 className="card-title font-bold text-black">
                    {postedJob.jobTitle}
                  </h2>
                  <p className="text-black">
                    Requirements:{" "}
                    {postedJob.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                                      {
                    postedJob.requirements?.length === 0 &&
                    <span className="italic">Undefined</span>
                  }
                  </p>

                  <div className="card-actions justify-end mt-8">
                    <button
                      className="btn-stroked"
                      onClick={() => handleShowDetails(postedJob._id)}>
                      Show details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default EmployeeSeesJobDetails;
