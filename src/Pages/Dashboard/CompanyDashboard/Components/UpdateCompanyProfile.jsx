import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UpdateCompanyProfile = () => {
    const { user } = useContext(AuthContext);
    const { uid } = user;
    const [company, setCompany] = useState({});
    const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-company-details/${uid}`
        );
        // Handle the response data
        console.log();
        setCompany(response.data)
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchData(); // Call the API when the component mounts
    console.log(company)
    return () => {
      // Perform clean-up tasks if needed
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Show loader
    // Assuming you have a state variable `isLoading` to track the loading state
  
    try {
      // console.log(formData);
      const res = await axios.put(`https://elegant-bd-jobs.onrender.com/update-single-company/${uid}`, formData);
      console.log(res.data.acknowledged);
      if (res.data.acknowledged) {
        toast.success('Company information updated...')
      }
      setFormData({});
  
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">Update your company profile</p>
         <form onSubmit={handleSubmit} className="w-[65vw] border-[1px] p-10">
        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Company name:</label>
            <input name="companyName"  onChange={handleInputChange} defaultValue={company?.companyName} type="text" placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>

        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Working Industry:</label>
            <input  onChange={handleInputChange} name="industry" defaultValue={company?.industry} type="text" placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>

        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Website:</label>
            <input name="website" onChange={handleInputChange} defaultValue={company?.website} type="text" placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>


        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Phone:</label>
            <input name="phone" onChange={handleInputChange} type="text" defaultValue={company?.phone} placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>
        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Description:</label>
            <textarea name="description" onChange={handleInputChange} defaultValue={company?.description} type="text" placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>
        <div className="form-control w-full mb-5">
            <label className="mr-3 font-bold mb-1">Facebook: </label>
            <input name="facebook" onChange={handleInputChange} defaultValue={company?.facebook} type="text" placeholder="Type here" className="input input-bordered m-2 mb-5" />
        </div>

        <button className="float-right btn-style">Update</button>
        
        
        </form>


        <Toaster position="top-center" reverseOrder={false} />



    </div>
  );
};

export default UpdateCompanyProfile;
