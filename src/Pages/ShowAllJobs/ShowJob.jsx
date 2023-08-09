/* eslint-disable react/prop-types */

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { Toaster, toast } from "react-hot-toast";

const ShowJob = ({ job }) => {
  const { _id, jobTitle, jobDescription } = job;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [setSavedStatus, setSetSavedStatus] = useState(false);

  const handleOnclickSaveLater = async () => {
    const response = await axios.put("https://elegant-bd-jobs.onrender.com/save-job", {
      id: _id,
      uid: user.uid,
    });
    if (response.data === "already saved") {
      setSetSavedStatus(true);
    }else{
      toast.success('Successfully toasted!')
    }
  };

  const handleOnclickShowDetails = () => {
    navigate(`/${_id}`);
    console.log(_id);
  };

  useEffect(() => {
    let timer;

    if (setSavedStatus) {
      timer = setTimeout(() => {
        setSetSavedStatus(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [setSavedStatus]);

  return (
    <div>
      <div className="w-full card-style border-[1px] m-3 text-primary-content flex flex-col h-full">
        <div className="card-body">
          <h2 className="card-title font-bold text-black">{jobTitle}</h2>
          <p className="text-black">{jobDescription}</p>
          <div className="card-actions justify-end mt-8">
            <button onClick={handleOnclickSaveLater} className="btn-style">
              Save it
            </button>
            <button onClick={handleOnclickShowDetails} className="btn-stroked">
              Show details
            </button>
          </div>
        </div>
      </div>

      {setSavedStatus && (
        <>
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>Already Saved...</span>
            </div>
          </div>
        </>
      )}
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default ShowJob;
