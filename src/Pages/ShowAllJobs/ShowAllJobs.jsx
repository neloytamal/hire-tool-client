import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../Context/JobsProvider";
import ShowJob from "./ShowJob";
import Loading from "../Shared/Loading";

const ShowAllJobs = () => {
  const { fetchAllJobs } = useContext(JobContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllJobs();
        setAllJobs(response.data);
        // response.data.map(x=>console.log(x))
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllJobs]);

  const handleLocationChange = (event) => {
    setLocation(event.target.id);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // const [checkboxValues, setCheckboxValues] = useState({
  //   web: false,
  //   digitalMarketing: false,
  //   designing: false,
  //   projectManager: false
  // });

  // const handleCategoryChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxValues(prevState => ({
  //     ...prevState,
  //     [name]: checked
  //   }));
  // };

  return (
    <div>
      <div>
        <div className="flex min-h-screen">
          <div className="p-8 focus:text-indigo-100 w-80 text-base-content bg-base-100 border-r-[0.5px] border-b-[0.5px] min-h-[50vh]">
            <div>
              <h1 className="text-base mb-4 font-semibold">Location</h1>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">All</span>
                  <input
                    type="radio"
                    id="all"
                    name="radio"
                    className="radio checked:bg-blue-500"
                    defaultChecked
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Dhaka</span>
                  <input
                    type="radio"
                    id="dhaka"
                    name="radio"
                    className="radio checked:bg-blue-500"
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Rajshahi</span>
                  <input
                    type="radio"
                    id="rajshahi"
                    name="radio"
                    className="radio checked:bg-blue-500"
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Bogura</span>
                  <input
                    type="radio"
                    id="bogura"
                    name="radio"
                    className="radio checked:bg-blue-500"
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <h1 className="text-base my-4 mt-6 font-semibold">Category</h1>
              <div className="mb-5">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">All</span>
                    <input
                      type="radio"
                      value="all"
                      name="radio2"
                      className="radio checked:bg-blue-500"
                      onClick={handleCategoryChange}
                      defaultChecked
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Web Development</span>
                    <input
                      type="radio"
                      value="Web"
                      name="radio2"
                      className="radio checked:bg-blue-500"
                      onClick={handleCategoryChange}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Digital Marketing</span>
                    <input
                      type="radio"
                      value="Digital Marketing"
                      name="radio2"
                      className="radio checked:bg-blue-500"
                      onClick={handleCategoryChange}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Designing</span>
                    <input
                      type="radio"
                      value="Designing"
                      name="radio2"
                      className="radio checked:bg-blue-500"
                      onClick={handleCategoryChange}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Project Manager</span>
                    <input
                      type="radio"
                      value="Project Manager"
                      name="radio2"
                      className="radio checked:bg-blue-500"
                      onClick={handleCategoryChange}
                    />
                  </label>
                </div>
                {/* <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Back-end Web Developer</span>
                  <input type="radio" name="r" className="checkbox w-[1rem] h-[1rem]" defaultChecked={checkboxValues.web} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Digital Marketing</span>
                  <input type="radio" name="r" className="checkbox w-[1rem] h-[1rem]" defaultChecked={checkboxValues.digitalMarketing} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Designing</span>
                  <input type="radio" name="r" className="checkbox w-[1rem] h-[1rem]"  defaultChecked={checkboxValues.designing} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Project Manager</span>
                  <input type="radio" name="r" className="checkbox w-[1rem] h-[1rem]" defaultChecked={checkboxValues.projectManager} onClick={handleCategoryChange}/>
                </label> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 w-[70vw] mx-auto mb-20">
            {isLoading ? (
              <Loading></Loading>
            ) : (
              <>
                {allJobs
                  .filter((locationedJobs) => location == "all" ? locationedJobs : locationedJobs?.location.toLowerCase() == location.toLowerCase())
                    .filter((categorizedJobs) => category == "all" ? categorizedJobs : categorizedJobs?.categories.toLowerCase() == category.toLowerCase())
                  .map((job) => {
                    return <ShowJob key={job._id} job={job}></ShowJob>;
                  })}
              </>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllJobs;
