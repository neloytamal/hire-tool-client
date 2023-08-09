import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const ApprovalPage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-company-details/${user.uid}`
        );
        const data = response.data;
        console.log(data.approval);
        setIsApproved(data?.approval);
        setIsRejected(data?.isRejected);
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
  }, [user.uid]);

  const handleOnClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center">
          {isApproved && isRejected === "2" ? (
            <>
              <p className="text-xl mr-3 text-green-500">Approved </p>
              <button className="btn-style" onClick={handleOnClick}>
                Go to dashboard
              </button>
            </>
          ) : isRejected === "1" ? (
            <div>
              <p className="text-xl">You have been rejected by the authority. For more details</p>
              <Link to="/contact-us">
                <button className="underline">Contact us</button>
              </Link>
            </div>
          ) : isRejected === "0" ? (
              <p  className="text-xl">We will soon approve your joining request</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ApprovalPage;
