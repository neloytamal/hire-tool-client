import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";

const AddJobs = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    companyLogo: "",
    industry: "",
    location: "",
    requirements: [],
    responsibilities: [],
    experienceLevel: "",
    salaryRange: "",
    applicationLink: "",
    postedDate: "",
    categories: "",
    uid: user?.uid,
    whoApplied: [],
    whoSaved: [],
  });
  const { uid } = user;
  const [company, setCompany] = useState({});

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "requirements") {
      const data = value.split(",").map((item) => item.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: data,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRequirementsChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedRequirements = [...prevFormData.requirements];
      updatedRequirements[index] = value;
      return {
        ...prevFormData,
        requirements: updatedRequirements,
      };
    });
  };

  const handleResponsibilitiesChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedResponsibilities = [...prevFormData.responsibilities];
      updatedResponsibilities[index] = value;
      return {
        ...prevFormData,
        responsibilities: updatedResponsibilities,
      };
    });
  };

  const addRequirement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      requirements: [...prevFormData.requirements, ""],
    }));
  };

  const addResponsibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      responsibilities: [...prevFormData.responsibilities, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://elegant-bd-jobs.onrender.com/add-job",
        formData
      );
      console.log(response.data); // Response from the server
      navigate("/dashboard/show-company-posted-jobs");
    } catch (error) {
      console.error("Error posting data:", error);
    }

    // console.log(formData); // Logged form data
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
        Add a new job
      </p>
      <form onSubmit={handleSubmit} className="w-[65vw] border-[1px] p-10">
        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Job Title:</label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Job Description:</label>
          <textarea
            className="input input-bordered m-2 mb-5"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Company Name:</label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="companyName"
            defaultValue={company.companyName}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Company Logo:</label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="companyLogo"
            value={company.companyLogo || company.photoURL}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Industry:</label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="industry"
            value={company.industry}
            onChange={handleChange}
            disabled
          />
        </div>
        <br />
        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Location: </label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Requirements:</label>
          {formData.requirements.map((requirement, index) => (
            <input
            placeholder="Type here"
              className="input input-bordered m-2 mb-5"
              key={index}
              type="text"
              value={requirement}
              onChange={(e) => handleRequirementsChange(e, index)}
            />
          ))}
          <button
            type="button"
            className="btnOnlyText w-fit hover:underline"
            onClick={addRequirement}>
            + Add Requirement
          </button>
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Responsibilities:</label>
          {formData.responsibilities.map((responsibility, index) => (
            <input
            placeholder="Type here"
              className="input input-bordered m-2 mb-5"
              key={index}
              type="text"
              value={responsibility}
              onChange={(e) => handleResponsibilitiesChange(e, index)}
            />
          ))}
          <button
            type="button"
            className="btnOnlyText w-fit hover:underline"
            onClick={addResponsibility}>
            + Add Responsibility
          </button>
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Experience Level: </label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="experienceLevel"
            value={formData?.experienceLevel}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Salary Range: </label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="salaryRange"
            value={formData?.salaryRange}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Last date to apply: </label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="date"
            name="postedDate"
            value={formData?.postedDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full mb-5">
          <label className="mr-3 font-bold mb-1">Categories:</label>
          <input
          placeholder="Type here"
            className="input input-bordered m-2 mb-5"
            type="text"
            name="categories"
            value={formData?.categories}
            onChange={handleChange}
          />
        </div>

        <br />

        <button
          type="submit"
          className="float-right btn bg-primary text-base-100 px-5 normal-case text-[16px] font-medium border-none hover:bg-neutral transition-all">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
