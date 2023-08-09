import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.svg"
import alternateImg from "../../assets/undefinedImg.jpg"
import axios from "axios";
import Loading from "../../Pages/Shared/Loading";


const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("")
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://elegant-bd-jobs.onrender.com/user-type?uid=${user.uid}`);
        const data = await response.json();
        // Process the retrieved data here
        console.log(data.role);
        if (data.role === "employee") {
          const response = await axios.get(`https://elegant-bd-jobs.onrender.com/get-single-user-info?uid=${user.uid}`);
          setUserData(response.data);
          // console.log(response.data.photoURL)
        } else if (data.role === "company") {
          const companyInfo = await axios.get(`https://elegant-bd-jobs.onrender.com/get-company-details/${user.uid}`);
          setUserData(companyInfo.data);
        }
        setRole(data.role)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
 
        setIsLoading(false); // Set loading to false when API call is finished
      }
    };

    if (user) {
      fetchData();
    }
    // Clean-up function
    return () => {
      // Perform clean-up tasks if needed
    };
  }, [user]);



  // useEffect(() => {
  //   setIsLoading(true)
  //   const fetchUserData = async () => {
  //     try {

  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally{
  //       setIsLoading(false)
  //     }
  //   };

  //   if (user && role) {
  //     fetchUserData();
  //   }

  //   return () => {
  //     // Perform clean-up tasks if needed
  //   };
  // }, [user, role]);

  const handleLogout = () => {
    setUserData({})
    logOut()
    navigate("/login")

  }

  const menuItems = (
    <>
    {
      role == "employee" &&  <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/show-all-jobs">All Jobs</NavLink>

    }
    <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/review">Review</NavLink>
    <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/contact-us">Contact Us</NavLink>
</>
);

  return (
    <div className="border-b-[1px] sticky top-0 z-10 w-full bg-white bg-opacity-90 backdrop-blur-md">
     <div className="navbar bg-transparent p-2 bg-base-100 md:w-4/5 mx-auto">
        <div className="navbar-start"> 
          <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/"><img src={logo} className="h-7" alt="logo" /></NavLink>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
   
          {user?.email ? (
            <>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar">
              <div className="w-10 rounded-full">
                <img src={userData?.photoURL || alternateImg} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard">
                  <button>Dashboard</button>
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
            </>
          ) : (
            <>
          <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/login">Login</NavLink>
          <NavLink   className={({ isActive }) => isActive ? "btn-style" : " btn-stroked"} to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
        </div>
  );
};

export default Navbar;
