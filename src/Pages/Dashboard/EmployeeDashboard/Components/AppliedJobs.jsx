/* eslint-disable react/prop-types */
import  { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import axios from 'axios';
import Loading from '../../../Shared/Loading';

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`https://elegant-bd-jobs.onrender.com/get-employee-applied-jobs/${uid}`);
        setAppliedJobs(response.data.appliedJobs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
            <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Applied Jobs
      </p>
      <div  className='flex flex-col items-center w-full'>
<div className="flex flex-col max-w-[60vw] ">
{appliedJobs.map((jobID) => (
        <AppliedJob key={jobID} jobID={jobID} />
      ))}
</div>
      </div>


    </div>
  );
};

export default AppliedJobs;




const AppliedJob =(props) => {

    const {jobID} = props
    const [loading, setLoading] = useState(true);
    const [appliedJobDetails, setAppliedJobDetails] = useState({})    

    useEffect(() => {
        const fetchAppliedJobs = async () => {
          try {
            const response = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-job-details-employee/${jobID}`);
            setAppliedJobDetails(response.data);
            setLoading(false);
            console.log(response.data);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
    
        fetchAppliedJobs();
      }, [jobID]);
    
      if (loading) {
        return <Loading></Loading>;
      }


    return (
        <div className='card-style my-2'>
          <div className="card-body card-style">
                 <h2 className="card-title font-bold text-black">{appliedJobDetails.jobTitle}</h2>
                 <p>Location: {appliedJobDetails.location || <span className='italic'>Undefined</span>}</p>
                 <p className="text-black mt-3">Description: {appliedJobDetails.jobDescription || <span className='italic'>Undefined</span>}</p>
              </div>
        </div>
      );

}