import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import companyLogo from "./Screenshot 2023-08-05 092626.png";
const SetComPanyProfile = () => {
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");

  const [formData, setFormData] = useState({
    companyName: "", ///////////////
    companyLogo: user?.photoURL || companyLogo, //////////////
    industry: "", //////////////
    registerID: "",
    locations: "", //////////////
    website: "", ///////////////
    email: "" || user?.email, //////////////
    phone: "", /////////////
    description: "", ////////////////
    facebook: "", ///////////////
    twitter: "", ///////////////
    linkedin: "", /////////////////
    uid: user?.uid,
    technologies: [], ///////////////
    approval: false,
    jobs: [],
    appointmentDetails: [],
    isRejected: "0",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      ...formData,
    });
    console.log("form data is ", formData);
    // console.log("🚀 ~ file: SetComPanyProfile.jsx:46 ~ handleSubmit ~ formData:", formData)
    
    
    axios.put(`https://elegant-bd-jobs.onrender.com/update-single-user/${user.uid}`,formData)
      .then((res) => {
        console.log("set company profile theke response kortisi", res);
        if (res.data.acknowledged) {
          navigate("/approval");
          return toast.success("Profile created successfully!");
        }
      });

  };

  const handleKeyTechnologiesChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      technologies: value.split(",").map((tech) => tech.trim()),
    }));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e?.target?.files[0]);
    reader.onload = () => {
      setProfilePic(reader.result);
      // eslint-disable-next-line no-unused-vars
      const { name, value } = e.target;
      // console.log("🚀 ~ file: SetComPanyProfile.jsx:76 ~ convertToBase64 ~ value:", value)
      setFormData({ ...formData,
         [name]: reader.result,
         photoURL:reader.result
        });
      // console.log("🚀 ~ file: SetComPanyProfile.jsx:75 ~ convertToBase64 ~ reader.result:", reader.result)
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Set Your Company profile
      </p>
      <form onSubmit={handleSubmit} className="min-w-[50vw] border-[1px] p-10">
        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Company Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Registered ID:</label>
          <input
            type="text"
            name="registerID"
            value={formData.registerID}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="register ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Industry"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Locations</label>
          <input
            type="text"
            name="locations"
            value={formData.locations}
            // value={formData.locations.join(', ')}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Locations"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Website"
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Email</label>
          {user && (
            <input
              disabled
              type="email"
              name="email"
              value={formData.email || user?.email}
              onChange={handleChange}
              className="border-[1px] input-bordered input m-2 w-full"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Phone"
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Description"></textarea>
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Technologies</label>
          <input
            type="text"
            name="technologies"
            placeholder="separate by comma (,) "
            value={formData.technologies.join(", ")}
            onChange={handleKeyTechnologiesChange}
            className="border-[1px] input-bordered input m-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Facebook"
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="border-[1px] input-bordered input m-2 w-full"
            placeholder="Twitter"
          />
        </div>

        <div className="mb-4">
          <label className="mr-3 font-bold mb-1">Linkedin</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Linkedin"
            className="border-[1px] input-bordered input m-2 w-full"
          />
        </div>

        <div className="mb-4">
          <img src={formData.companyLogo} className="max-w-sm" alt="" />
          <div className="m-2">
            <label className="block mb-2">Choose a image for profile</label>
            <input
              type="file"
              accept="image/*"
              className="file-input-primary file-input border-[1px] bordered"
              name="companyLogo"
              onChange={convertToBase64}
            />
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="btn bg-primary text-base-100 px-5 normal-case text-[16px] font-medium border-none hover:bg-neutral transition-all float-right">
            Submit
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default SetComPanyProfile;
