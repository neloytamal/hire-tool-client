/* eslint-disable react/prop-types */
import "react";
import { Link } from "react-router-dom";

const Industry = (props) => {
  return (
    <div>
      <Link className="cursor-pointer" to="/show-all-jobs">
        <div className="card card-style">
          <figure>
            <img
              src={props.img}
              alt="Shoes"
              className="h-64"
              height={250}
              width={250}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title  justify-center">{props.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Industry;
