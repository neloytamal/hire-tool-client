import "react";
import logo from "../../assets/logo.svg"
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="">
        <footer className="footer p-10 bg-primary bg-opacity-10 text-base-content items-center md:place-content-evenly place-content-start">
        <div>
    <span className="footer-title">Services</span> 
    <Link className="link link-hover">Branding</Link> 
    <Link className="link link-hover">Design</Link> 
    <Link className="link link-hover">Marketing</Link> 
    <Link className="link link-hover">Advertisement</Link>
  </div>
  <div>
    <span className="footer-title">Company</span> 
    <Link className="link link-hover">About us</Link> 
    <Link to="/contact-us" className="link link-hover">Contact</Link> 
    <Link to="/show-all-jobs" className="link link-hover">Jobs</Link> 
  </div> 
  <div>
    <span className="footer-title">Newsletter</span> 
    <div className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="relative">
        <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" /> 
        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
      </div>
    </div></div>
</footer>
<footer className="footer px-10 py-4 border-t bg-primary bg-opacity-10 text-base-content border-base-300 items-center md:place-content-evenly place-content-start">
  <div className="items-center grid-flow-col">
    <img className="w-44 mr-6" src={logo} alt="logo" />
    <p>ACME Industries Ltd. <br/>Providing reliable tech since 1992</p>
  </div> 
</footer>
    </div>
  );
};

export default Footer;
