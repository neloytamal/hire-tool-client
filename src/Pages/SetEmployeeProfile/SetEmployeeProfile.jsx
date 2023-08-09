import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import previewIMG from "./Screenshot 2023-08-05 092626.png"

const SetEmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [employeeData, setEmployeeData] = useState({
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
    // skillsAndQualifications: {
    //   keySkills: [],
    //   certifications: [],
    // },
    keySkills: [],
    certifications: [],
    desiredJobTitle: "",
    preferredLocation: "",
    savedJobs: [],
    appliedJobs: [],
    calledForInterview: [],
    phone: "",
    address: "",
    displayName: "" || user?.displayName,
    email: "" || user.email,
    previousNotificationCount: 0,
    photoURL: previewIMG,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: [
          ...prevData.workExperience.education,
          {
            degree: "",
            institution: "",
            major: "",
            graduationDate: "",
          },
        ],
      },
    }));
  };

  const handleAddWorkExperience = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: [
          ...prevData.workExperience.jobHistory,
          {
            company: "",
            jobTitle: "",
            employmentStartDate: "",
            employmentEndDate: "",
          },
        ],
      },
    }));
  };

  const handleEducationInputChange = (event, index) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.map((edu, i) =>
          i === index ? { ...edu, [name]: value } : edu
        ),
      },
    }));
  };

  const handleKeySkillChange = (event, index) => {
    const { value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      keySkills: prevData.keySkills.map((skill, i) =>
        i === index ? value : skill
      ),
    }));
  };

  const handleAddKeySkill = () => {
    setEmployeeData((prevData) => ({
      ...prevData,

      keySkills: [...prevData.keySkills, ""],
    }));
  };

  const handleAddCertification = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      certifications: [...prevData.certifications, ""],
    }));
  };

  const handleCertificationChange = (event, index) => {
    const { value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      certifications: prevData.certifications.map((cert, i) =>
        i === index ? value : cert
      ),
    }));
  };

  const handleWorkExperienceInputChange = (event, index) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: prevData.workExperience.jobHistory.map((job, i) =>
          i === index ? { ...job, [name]: value } : job
        ),
      },
    }));
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    // console.log("🚀 ~ file: SetEmployeeProfile.jsx:160 ~ handleSubmit ~ employeeData:", employeeData)
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post("https://elegant-bd-jobs.onrender.com/set-employee-profile",employeeData);

      if (response.data.acknowledged) {
        navigate("/dashboard");
        toast.success("Successfully toasted!");
      }
    } catch (error) {
      // Handle error
      console.log(error);
      toast.error("An error occurred!");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e?.target?.files[0]);
    reader.onload = () => {
      const { name } = e.target;
      setEmployeeData((prevData) => ({
      ...prevData,
      [name]: reader.result,
    }));
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Set Your CV profile
      </p>
      <form onSubmit={handleSubmit} className="max-w-[65vw] border-[1px] p-10">
        <h3 className="mb-2 text-xl font-medium text-primary">
          Work Experience
        </h3>
        {employeeData.workExperience.jobHistory.map((job, index) => (
          <div key={index}>
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="company"
              value={job.company}
              onChange={(e) => handleWorkExperienceInputChange(e, index)}
              placeholder="Company"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="jobTitle"
              value={job.jobTitle}
              onChange={(e) => handleWorkExperienceInputChange(e, index)}
              placeholder="Job Title"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="employmentStartDate"
              value={job.employmentStartDate}
              onChange={(e) => handleWorkExperienceInputChange(e, index)}
              placeholder="Employment Start Date"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="employmentEndDate"
              value={job.employmentEndDate}
              onChange={(e) => handleWorkExperienceInputChange(e, index)}
              placeholder="Employment End Date"
            />
          </div>
        ))}
        <button
          type="button"
          className="hover:underline btnOnlyText p-0"
          onClick={handleAddWorkExperience}>
          + Add Work Experience
        </button>

        <div className="my-5" />

        <h3 className="mb-2 text-xl font-medium text-primary">Education</h3>
        {employeeData.workExperience.education.map((edu, index) => (
          <div key={index}>
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Degree"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Institution"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="major"
              value={edu.major}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Major"
            />
            <input
              className="border-[1px] input-bordered input m-2"
              type="text"
              name="graduationDate"
              value={edu.graduationDate}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Graduation Date"
            />
          </div>
        ))}
        <button
          className="hover:underline btnOnlyText p-0"
          type="button"
          onClick={handleAddEducation}>
          + Add Education
        </button>

        <div className="my-5" />

        <h3 className="mb-2 text-xl font-medium text-primary">
          Skills and Qualifications
        </h3>
        <div className="flex flex-wrap">
          {employeeData.keySkills.map((skill, index) => (
            <div key={index}>
              <input
                className="border-[1px] input-bordered input m-2"
                type="text"
                value={skill}
                onChange={(e) => handleKeySkillChange(e, index)}
                placeholder={`Skill  ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="hover:underline btnOnlyText p-0"
          type="button"
          onClick={handleAddKeySkill}>
          + Add Skill
        </button>

        <div className="my-8" />

        <h3 className="mb-2 text-xl font-medium text-primary">Certificate</h3>
        {employeeData.certifications.map((cert, index) => (
          <div key={index}>
            <input
              className="border-[1px] input-bordered input m-2 w-full"
              type="text"
              value={cert}
              onChange={(e) => handleCertificationChange(e, index)}
              placeholder="Certification"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCertification}
          className="hover:underline btnOnlyText p-0">
          + Add Certification
        </button>

        <div className="my-8" />

        <h3 className="mb-2 text-xl font-medium text-primary">
          Job Preferences & Contact Information
        </h3>
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="displayName"
          value={employeeData?.displayName || ""}
          onChange={handleInputChange}
          placeholder="Display Name"
          required
        />
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="email"
          value={employeeData.email}
          onChange={handleInputChange}
          placeholder="Email"
          // defaultValue={user?.email}
          disabled
        />
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="desiredJobTitle"
          value={employeeData.desiredJobTitle}
          onChange={handleInputChange}
          placeholder="Desired Job Title"
          required
        />
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="preferredLocation"
          value={employeeData.preferredLocation}
          onChange={handleInputChange}
          placeholder="Preferred Location"
          required
        />
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="phone"
          value={employeeData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <input
          className="border-[1px] input-bordered input m-2"
          type="text"
          name="address"
          value={employeeData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <br />
        {/* <input type="file" className="border-[1px] file-input-bordered file-input m-2 file-input-primary"  placeholder="Address"/> */}
        <div className="my-8" />
        <img src={employeeData.photoURL} className="max-w-sm" alt="" />
        <div className="m-2">
          <label className="block mb-2">Choose a image for profile</label>
          <input
            type="file"
            accept="image/*"
            name="photoURL"
            className="file-input-primary file-input border-[1px] bordered"
            onChange={convertToBase64}
          />
        </div>

        <div className="my-8" />

        <button
          type="submit"
          className="btn bg-primary text-base-100 px-5 normal-case text-[16px] font-medium border-none hover:bg-neutral float-right">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default SetEmployeeProfile;
