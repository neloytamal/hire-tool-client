import "react";
import Industry from "./Industry";
import img1 from "../../../assets/Code typing-bro.svg";
import img2 from "../../../assets/SEO analytics team-bro.svg";
import img3 from "../../../assets/Palette-bro.svg";
import img4 from "../../../assets/Website Creator-bro.svg";

const Industries = () => {
  const industries = [
    {
      _id: "1",
      title: "Back-end Developer",
      img: img1,
    },
    {
      _id: "2",
      title: "Digital marketing",
      img: img2,
    },
    {
      _id: "3",
      title: "Designing",
      img: img3,
    },
    {
      _id: "4",
      title: "Project Manager",
      img: img4,
    },
  ];

  return (
    <div className="w-full justify-center flex flex-col items-center py-[10rem] ">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">Various kinds of industries</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-[80vw] w-[90vw] gap-5 content-center">
        {industries.map(industry => <Industry title={industry.title} key={industry._id} img={industry.img}></Industry>)}
      </div>
    </div>
    //  <div className="md:w-4/5  mx-auto">
    // <div className="min-h-screen flex-col items-center justify-center flex w-full">
    //       <h1 className="text-3xl font-semibold text-center mb-10 ">
    //         Various types of industries
    //       </h1>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-4 gro">
    //         {industries.map((industry) => (
    //           <Industry
    //             title={industry.title}
    //             key={industry._id}
    //             img={industry.img}
    //           ></Industry>
    //         ))}
    //       </div>
    //     </div>
    // </div>
  );
};

export default Industries;
