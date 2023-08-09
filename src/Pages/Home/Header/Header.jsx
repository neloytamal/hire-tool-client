import "react";
import handshake from "../../../assets/handshake.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="card h-[90vh] lg:card-side bg-white bg-opacity-10">
      <div className="card-body lg:w-6/12 justify-center order-last lg:order-none items-center">
        <div className="lg:w-6/12">
        <h1 className="text-5xl font-bold">
          Unleash your Professional Potential with us.
        </h1>
        <p className="py-6 flex-grow-0">
        We are committed to continuously improving our platform by incorporating user feedback and leveraging the latest technological advancements. Our goal is to make Hire Tool the go-to destination for job seekers and employers alike.

        </p>
        <Link to="/signup" className="btn-style">
          Get started
        </Link>
        </div>
      </div>
      <figure className="lg:w-6/12">
        <img src={handshake} alt="Album" />
      </figure>
    </div>
  );
};

export default Header;
