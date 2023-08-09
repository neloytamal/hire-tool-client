/* eslint-disable react/prop-types */
import "react";
import { useNavigate } from "react-router-dom";


const Job = (props) => {

  const navigate = useNavigate()

  const handleOnclickShowDetails = () => {
    navigate(`/${props._id}`);
    console.log(props._id);
  };


  return (
    <div>
      <div className="card-style cursor-pointer">
        <div className="card-body flex flex-row w-full justify-between items-center">
          <div>
            <h2 className="card-title mb-1">
              {props.title}
            </h2>
            <p>{props.company} - {props.category}</p>
            <p className="mb-3">{props.location}</p>
            <p className="w-[800px]">{props.description}</p>
          </div>
          <div className="card-actions justify-end block">
            <button className="btn-style" onClick={handleOnclickShowDetails}>See details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
