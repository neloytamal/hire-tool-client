/* eslint-disable react/prop-types */
import "react";
import heroImg from "../../assets/colleagues.png";

const AboutUs = (props) => {
  return (
    <div>
      <div
        className="hero min-h-[80vh]"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay bg-primary bg-opacity-[85%]"></div>
        <div className="hero-content max-w-[60rem]">
          <div className="max-w-[80%] ">
            <h1 className="mb-8 text-5xl font-bold text-white">hiretool</h1>
            <p className="mb-8 text-white">
              Hire Tool is an online job platform connecting job seekers with
              potential employers. Users can create a profile, search for job
              openings, and receive personalized job recommendations. Employers
              can post job openings and review resumes to find the best match.
              The platform is user-friendly and offers useful features such as
              job alerts and salary estimates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center w-full">
                <div className="bg-base-100 bg-opacity-20 backdrop-blur-md rounded-xl py-10">
                <div className="stat-value text-white">{props.totalJobs}</div>
                <div className="stat-title text-white">Jobs</div>
              </div>
              <div className="bg-base-100 bg-opacity-20 backdrop-blur-md rounded-xl py-10">
                <div className="stat-value text-white">{props.totalCompany}</div>
                <div className="stat-title text-white">Companies</div>
              </div>
              <div className="bg-base-100 bg-opacity-20 backdrop-blur-md rounded-xl py-10">
                <div className="stat-value text-white">{props.totalEmployee}</div>
                <div className="stat-title text-white">Employees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
