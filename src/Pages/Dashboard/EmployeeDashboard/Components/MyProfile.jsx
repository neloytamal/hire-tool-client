import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
// import ReactPDF, {  PDFDownloadLink } from "@react-pdf/renderer";
// import CVpdf from "./CVpdf";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading";
import undefinedImg from "../../../../assets/undefinedImg.jpg";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const componentPDF = useRef();
  const [userInfo, setUserInfo] = useState(null);
  // const [badgeClass, setBadgeClass] = useState("")
  // ReactPDF.render(<CVpdf />, `${user.displayName}/example.pdf`);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://elegant-bd-jobs.onrender.com/get-single-user-info?uid=${user.uid}`);
        const data = await response.json();
        console.log("🚀 ~ file: MyProfile.jsx:22 ~ fetchUserInfo ~ data:", data)
        if (
          data.previousNotificationCount !== undefined &&
          Array.isArray(data.calledForInterview) &&
          data.previousNotificationCount !== data.calledForInterview?.length
        ) {
          localStorage.setItem("badge", "badge badge-primary");
        }
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);


  

  const handleDownloadPDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "cv",
    onAfterPrint: () =>
      Swal.fire("Good job!", "You clicked the button!", "success"),
  });
  console.log(userInfo);
  return (
    <div>
      {userInfo ? (
        <>
          {/* <div ref={componentPDF}>


       
  
     
        <p>email : {userInfo.email}</p>
        <p>role: {userInfo.role}</p>

        <button onClick={handleDownloadPDF} className="btn w-32  btn-outline btn-primary">Download</button>
        </div> */}

          <div className="flex justify-between" ref={componentPDF}>
            <div>
              <p className="text-3xl font-extrabold text-primary mb-5">
                {userInfo.displayName || "Name"}
              </p>
              <p>
                Email:{" "}
                {userInfo.email || (
                  <span className="italic">Email Undefined</span>
                )}
              </p>
              <p>
                Phone:{" "}
                {userInfo?.phone || (
                  <span className="italic">No phone number found</span>
                )}
              </p>
              <p>
                Job Title:{" "}
                {userInfo.desiredJobTitle || (
                  <span className="italic">Undefined</span>
                )}
              </p>
              <p>
                Address:{" "}
                {userInfo.address || (
                  <span className="italic">no location defined</span>
                )}
              </p>
              <p>
                Skills:
                {userInfo.keySkills?.length === 0 ? (
                  <span className="italic">Undefined</span>
                ) : (
                  userInfo.keySkills?.map((skill, index) => (
                    <span className="badge-ghost mx-1 px-2" key={index}>
                      {skill}
                    </span>
                  ))
                )}
              </p>
              <p className="flex mt-3">
                Job History:
                <p className="grid grid-cols-3 gap-2">
                  {userInfo.workExperience?.jobHistory.map(
                    (singleJob, index) => (
                      <li key={index} type="1" className="px-2">
                        <p>Company: {singleJob.company}</p>
                        <p>Joined In: {singleJob.employmentStartDate}</p>
                        <p>Left in: {singleJob.employmentStartDate}</p>
                      </li>
                    )
                  )}
                </p>
              </p>
              <p className="flex mt-3">
                Education:
                <p className="grid grid-cols-3 gap-2">
                  {userInfo.workExperience?.education.map((edu, index) => (
                    <li key={index} type="1" className="px-2">
                      <p>institution: {edu.institution}</p>
                      <p>Degree: {edu.degree}</p>
                      <p>Graduation Date: {edu.graduationDate}</p>
                    </li>
                  ))}
                </p>
              </p>
              <button onClick={handleDownloadPDF} className="btn-style mt-6">
                Download PDF
              </button>
            </div>

            <div>
              <div className="avatar">
                <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={userInfo?.photoURL || undefinedImg} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default MyProfile;
