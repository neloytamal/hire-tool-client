import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostedJob from './PostedJob';
import { AuthContext } from '../../../../../Context/AuthProvider';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
    const {user} = useContext(AuthContext)
    const [waiting, setWaiting] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://elegant-bd-jobs.onrender.com/show-all-jobs');
        const filteredJobs = response.data.filter(job => job.uid.includes(user.uid));
        setJobs(filteredJobs);
        // console.log(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      setWaiting(false)
    };

    fetchJobs();
  }, []);

  if (waiting) {
    return <p>waiting</p>
  }

  return (
    <div>
      {
        waiting ?
        <p>waiting</p>
        :
        <>
        <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">Posted Jobs</p>
      {jobs.map((job) => (

        <PostedJob
        key={job._id}
        job={job}
        ></PostedJob>
        // <div key={job._id}>
        //   <h2>job title:{job.jobTitle}</h2>
        //   <p>{job.jobDescription}</p>
        //   <p>Category: {job.categories}</p>
        //   {/* Add additional card information here */}
        // </div>
      ))}
        </>
      }
    </div>
  );
};

export default PostedJobs;
