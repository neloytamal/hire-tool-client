/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../../Shared/Loading";

const UpdateEmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [company, setCompany] = useState("");
  const [companyJobTitle, setCompanyJobTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentStartDate, setEmploymentStartDate] = useState("");
  const [employmentEndDate, setEmploymentEndDate] = useState("");
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [graduationDate, setGraduationDate] = useState("");

  const [preferredJobLocation, setPreferredJobLocation] = useState("");
  const [desiredJobTitle, setDesiredJobTitle] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://elegant-bd-jobs.onrender.com/get-single-employee/${uid}`
        );
        setPreferredJobLocation(
          response.data.payload.employee?.preferredLocation
        );
        setJobTitle(response.data.payload.employee?.desiredJobTitle);
        setEmployeeData(response.data.payload.employee);
        setLoading(false);
        // console.log( employeeData.preferredLocation);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        // console.log(employeeData?.workExperience?.education)
      }
    };

    fetchEmployeeData();
  }, [employeeData, formData]);

  const handleRemoveJobExperience = async (index) => {
    try {
      setLoading(true);

      const jobHistoryArray = employeeData.workExperience.jobHistory;
      let newArray = [];

      for (let i = 0; i < jobHistoryArray?.length; i++) {
        if (i !== index) {
          newArray.push(jobHistoryArray[i]);
        }
      }

      employeeData.workExperience.jobHistory = newArray;
      setEmployeeData(employeeData);

      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-profile-jobHistory-section/${uid}`,
        employeeData
      );
      if (response.data.acknowledged) {
        toast.success("Successfully removed!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEducation = async (index) => {
    try {
      setLoading(true);

      const educationArray = employeeData.workExperience.education;
      let newArray = [];

      for (let i = 0; i < educationArray?.length; i++) {
        if (i !== index) {
          newArray.push(educationArray[i]);
        }
      }

      employeeData.workExperience.education = newArray;
      setEmployeeData(employeeData);

      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-profile-education/${uid}`,
        employeeData
      );
      if (response.data.acknowledged) {
        toast.success("Successfully removed!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create an object with the input field values
    const formData = {
      company,
      companyJobTitle,
      employmentStartDate,
      employmentEndDate,
    };

    // Log the object
    console.log(formData);
    employeeData.workExperience.jobHistory.push(formData);

    try {
      // Make the API call
      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-profile-jobHistory-section/${uid}`,
        employeeData
      );

      if (response.data.acknowledged) {
        toast.success("Job added successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Clear the input fields
    setCompany("");
    setCompanyJobTitle("");
    setEmploymentStartDate("");
    setEmploymentEndDate("");
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const inputs = Array.from(event.target.elements);
  //   const submittedData = {};

  //   inputs.forEach((input) => {
  //     if (input.value && input.name) {
  //       submittedData[input.name] = input.value;
  //     }
  //   });

  //   console.log(submittedData);

  //   setLoading(true);
  //   try {
  //     // Make the API call here using Axios
  //      const response = await axios.patch(`https://elegant-bd-jobs.onrender.com/update-employee-other-infos/${user.uid}`, submittedData);
  //     setFormData(submittedData);
  //     console.log(response)
  //   } catch (error) {
  //     console.error('Error occurred while calling the API:', error);
  //   }finally{
  //     setLoading(false);
  //     formRef.current.reset(); // Reset the form values
  //   }
  // };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      institution,
      degree,
      major,
      graduationDate,
    };

    console.log(formData);

    employeeData.workExperience.education.push(formData);
    console.log(employeeData.workExperience.education);
    try {
      // Make the API call
      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-profile-education/${uid}`,
        employeeData
      );

      if (response.data.acknowledged) {
        toast.success("Job added successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Clear the input fields
    setInstitution("");
    setDegree("");
    setMajor("");
    setGraduationDate("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputs = Array.from(event.target.elements);
    const submittedData = {};

    inputs.forEach((input) => {
      if (input.value && input.name) {
        submittedData[input.name] = input.value;
      }
    });

    console.log(submittedData);

    setLoading(true);
    try {
      // Make the API call here using Axios
      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-other-infos/${user.uid}`,
        submittedData
      );
      setFormData(submittedData);
      console.log(response);
    } catch (error) {
      console.error("Error occurred while calling the API:", error);
    } finally {
      setLoading(false);
      formRef.current.reset(); // Reset the form values
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }



  return (
    <div className="flex flex-col items-center">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Update Profile
      </p>
      <div className="max-w-[65vw] border-[1px] p-10 max-w-[58vw]">
        <div>
          <h3 className="mb-2 text-xl font-medium text-primary">
            Work Experience
          </h3>
          <div className="mb-3">
                      {employeeData?.workExperience?.jobHistory?.map((job, index) => (
            <div key={index || -1} className="flex gap-6">
              <li>
                Joined <strong>{job.company}</strong> as <strong>{job.companyJobTitle}</strong>
                ......from <strong>{job.employmentEndDate}</strong> to{" "}
                <strong>{job.employmentStartDate}</strong>
              </li>
              <button
                onClick={() => handleRemoveJobExperience(index)}
                className="text-error">
                X
              </button>
            </div>
          ))}
          </div>

          

          <form>
            <input
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              placeholder="Enter company name"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => setCompanyJobTitle(e.target.value)}
              type="text"
              placeholder="Enter you job title"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => setEmploymentStartDate(e.target.value)}
              type="text"
              placeholder="Enter joining date"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => setEmploymentEndDate(e.target.value)}
              type="text"
              placeholder="Enter leaving date"
              className="border-[1px] input-bordered input m-2"
            />

            <button
              type="submit"
              onClick={handleAddJob}
              className="hover:underline btn bg-transparent hover:text-primary px-5 normal-case text-[16px] font-medium border-none hover:bg-transparent transition-all">
              ↻ Update with New Experience
            </button>
          </form>
        </div>

        <div>
        <h3 className="mb-2 text-xl font-medium text-primary mt-5">
        Educational qualification
          </h3>
          <p></p>
          <div className="mb-3">
                      {employeeData?.workExperience?.education?.map((edu, index) => (
            <div key={index || -1} className="flex gap-6 ">
              <li> From{" "}
                <strong>{edu.institution}</strong> in{" "}
                <strong>{edu.graduationDate}</strong> I did{" "}
                <strong>{edu.degree}</strong> in <strong>{edu.major}</strong>
              </li>
              <button
                onClick={() => handleRemoveEducation(index)}
                className="text-error">
                X
              </button>
            </div>
          ))}
          </div>


          <form>
            <input
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              type="text"
              placeholder="Enter degree name"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => {
                setInstitution(e.target.value);
              }}
              type="text"
              placeholder="Enter institution name"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => {
                setMajor(e.target.value);
              }}
              type="text"
              placeholder="Enter subject name"
              className="border-[1px] input-bordered input m-2"
            />
            <input
              onChange={(e) => {
                setGraduationDate(e.target.value);
              }}
              type="text"
              placeholder="Enter graduation date"
              className="border-[1px] input-bordered input m-2"
            />

            <button
              type="submit"
              onClick={handleAddEducation}
              className="hover:underline btn bg-transparent hover:text-primary px-5 normal-case text-[16px] font-medium border-none hover:bg-transparent transition-all">
              ↻ Update with New Educational Qualification
            </button>
          </form>
        </div>


              <hr className="my-5"/>



        <form ref={formRef} onSubmit={handleSubmit}>
<div className="flex flex-col">
<label htmlFor="desiredJobTitle">
            Desired Job Title
            <input
              type="text"
              id="desiredJobTitle"
              name="desiredJobTitle"
              placeholder="Desired Job Title"
              className="border-[1px] input-bordered input m-2"
              defaultValue={employeeData?.desiredJobTitle}
            />
          </label>


          <label htmlFor="preferredJobLocation">
            Preferred Job Location
            <input
              type="text"
              id="preferredJobLocation"
              name="preferredJobLocation"
              placeholder="Preferred Job Location"
              className="border-[1px] input-bordered input m-2"
              defaultValue={employeeData?.preferredJobLocation}
            />
          </label>

          <label htmlFor="phone">
            Phone Number
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="border-[1px] input-bordered input m-2"
              defaultValue={employeeData?.phone}
            />
          </label>

          <label htmlFor="address">
            Address
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="border-[1px] input-bordered input m-2"
              defaultValue={employeeData?.address}
            />
          </label>
</div>
          <div className="card-actions justify-end mt-8 w-full">
            <button className="btn bg-primary text-base-100 px-5 normal-case text-[16px] font-medium border-none hover:bg-neutral">
              Update
            </button>
          </div>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UpdateEmployeeProfile;

/*

import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";

const UpdateEmployeeProfile = () => {
  
  const [jobHistory, setJobHistory] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [leavingDate, setLeavingDate] = useState("");

  const [updatedData, setUpdatedData] = useState({
    workExperience: {
      jobHistory: [
        {
          company: "",
          jobTitle: "",
          employmentStartDate: "",
          employmentEndDate: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          major: "",
          graduationDate: "",
        },
      ],
    },
    skillsAndQualifications: {
      keySkills: [],
      certifications: [],
    },
    desiredJobTitle: "",
    preferredLocation: "",
    phone: "",
    address: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobHistoryChange = (event, index) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: prevData.workExperience.jobHistory.map((job, i) => {
          if (i === index) {
            return {
              ...job,
              [name]: value,
            };
          }
          return job;
        }),
      },
    }));
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.map((education, i) => {
          if (i === index) {
            return {
              ...education,
              [name]: value,
            };
          }
          return education;
        }),
      },
    }));
  };



  const handleRemoveEducation = (index) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.filter(
          (education, i) => i !== index
        ),
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      console.log("Updated Data:", updatedData);
      const response = await axios.patch(
        `https://elegant-bd-jobs.onrender.com/update-employee-profile/${uid}`,
        updatedData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  //by me not chat gpt
  const handleAddWorkExperience = () => {
    const updatedWorkExperience = {
      company: companyName,
      jobTitle: jobTitle,
      joiningDate: joiningDate,
      leavingDate: leavingDate,
    };
    employeeData?.workExperience.jobHistory.push(updatedWorkExperience)
    console.log("newEmployee:",employeeData)
  };

  const handleRemoveJobHistory = (index) => {
    // Create a copy of the jobHistory array
    const jobHistory = [...employeeData.workExperience.jobHistory];
    
    // Remove the element at the specified index
    jobHistory.splice(index, 1);
    
    // Update the employeeData with the modified jobHistory array
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: jobHistory,
      },
    }));
    console.log(employeeData)
  };
  



  return (
    <div>
      <p>Update profile</p>
      <form onSubmit={handleSubmit}>
        <label>Desired Job Title:</label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          name="desiredJobTitle"
          value={updatedData.desiredJobTitle || employeeData.desiredJobTitle}
          onChange={handleInputChange}
        />

        <label>Preferred Location:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="preferredLocation"
          value={
            updatedData.preferredLocation || employeeData.preferredLocation
          }
          onChange={handleInputChange}
        />

        <label>Phone:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="phone"
          value={updatedData.phone || employeeData.phone}
          onChange={handleInputChange}
        />

        <label>Address:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="address"
          value={updatedData.address || employeeData.address}
          onChange={handleInputChange}
        />

        <h3>Job History</h3>

        <br />
        <br />

        {jobHistory?.map((history, index) => (
          <div key={index}>
            <label>{index + 1}. </label>
            <label>Company: {history?.company}</label>
            <label>______Job title: {history?.jobTitle}</label>
            <label>______Joining date: {history?.employmentStartDate}</label>
            <label>______Ending date: {history?.employmentEndDate}</label>
            <button
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              onClick={() => handleRemoveJobHistory(index)}
            >
              {" "}
              Remove Job{" "}
            </button>
          </div>
        ))}

        <div className="flex">
          <input
            type="text"
            placeholder="Enter company name"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your job title"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="Enter your joining date"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Enter your leaving date"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={leavingDate}
            onChange={(e) => setLeavingDate(e.target.value)}
          />
          <button
            onClick={handleAddWorkExperience}
            className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
          >
            <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
              Add Job Experience
            </span>
          </button>
        </div>

        <h3>Education</h3>
        {employeeData.workExperience.education.map((education, index) => (
          <div key={index}>
            <label>Degree:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              placeholder="Degree"
              type="text"
              name="degree"
              value={
                updatedData.workExperience.education[index]?.degree ||
                education.degree
              }
              onChange={(event) => handleEducationChange(event, index)}
            />

            <label>Institution:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              placeholder="Institution"
              type="text"
              name="institution"
              value={
                updatedData.workExperience.education[index]?.institution ||
                education.institution
              }
              onChange={(event) => handleEducationChange(event, index)}
            />

            <button
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove Education
            </button>
          </div>
        ))}

        <button
          className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeeProfile;
*/
