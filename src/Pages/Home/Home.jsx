import  { useEffect, useState } from "react";
import axios from "axios";
import FeaturedJobs from "./FeaturedJobs/FeaturedJobs";
import Header from "./Header/Header";
import Industries from "./Industries/Industries";
import AboutUs from "../AboutUs/AboutUs"
import ShowAllReviews from "../ShowAllReviews/ShowAllReviews";
const Home = () => {

  const [totalJobs, setTotalJobs] = useState(0)
  const [totalCompany, setTotalCompany] = useState(0)
  const [totalEmployee, setTotalEmployee] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://elegant-bd-jobs.onrender.com/get-total-count");
        const data = response.data
        setTotalCompany(data.totalCompany)
        setTotalEmployee(data.totalEmployees)
        setTotalJobs(data.totalJobs)
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      // eslint-disable-next-line no-empty
      }finally{

      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <Header></Header>
        <Industries></Industries>
        <FeaturedJobs></FeaturedJobs>
        <AboutUs totalCompany={totalCompany} totalEmployee={totalEmployee} totalJobs={totalJobs}></AboutUs>
        <ShowAllReviews></ShowAllReviews>
    </div>
  );
};

export default Home;
