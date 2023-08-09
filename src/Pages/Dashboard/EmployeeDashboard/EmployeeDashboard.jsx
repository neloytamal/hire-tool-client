import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  const [badge,setBadge] = useState("")
  const [trg, setTrg] = useState(0)
  useEffect(()=>{
    const b = localStorage.getItem("badge")
    console.log("b = ", b)
    setTrg(0)
    setBadge(b)
  },[trg])

  const handleOnClick = () =>{
    setTrg(1)
  }

    return (
        // <div className="drawer lg:drawer-open">
        // <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        // <div className="drawer-content flex flex-col items-center justify-center">
        //   {/* Page content here */}
        //   <Outlet></Outlet>
        //   <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        // </div> 
        // <div className="drawer-side">
        //   <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        //   <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        //     {/* Sidebar content here */}
        //     <Link to="/dashboard/my-profile"  ><li><button onClick={handleOnClick} className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">My Profile</button></li></Link>
        //     <Link to="/dashboard/update-employee-profile" ><li><button onClick={handleOnClick} className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Update Profile</button></li></Link>
        //     <Link to="/dashboard/saved-jobs" ><li><button onClick={handleOnClick} className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Saved Jobs</button></li></Link>
        //     <Link to="/dashboard/applied-jobs" ><li><button onClick={handleOnClick} className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Applied Jobs</button></li></Link>
        //     <Link to="/dashboard/employee-notifications" ><li><button onClick={handleOnClick} className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100 ">Notifications <span className={badge}></span></button></li></Link>
        //   </ul>
        
        // </div>
        //       </div>


<div className="flex min-h-screen">
<div className="p-6 w-80 focus:text-indigo-100 md:relative z-[9] text-base-content h-screen bg-base-100 border-r-[0.5px]">
  <ul className="space-y-2">
    <li>
        <li>
      <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/my-profile">
          <button onClick={handleOnClick} className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
          My Profile
          </button>
      </NavLink>
        </li>
    </li>
    <li>
        <li>
      <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/update-employee-profile">
          <button onClick={handleOnClick} className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
          Update Profile
          </button>
      </NavLink>
        </li>
    </li>
    <li>
        <li>
      <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/saved-jobs">
          <button onClick={handleOnClick} className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
          Saved Jobs
          </button>
      </NavLink>
        </li>
    </li>
    <li>
        <li>
      <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/applied-jobs">
          <button onClick={handleOnClick} className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
          Applied Jobs
          </button>
      </NavLink>
        </li>
   
    </li>
    <li>
        <li>
      <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/employee-notifications">
          <button onClick={handleOnClick} className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
            Notifications<span>{badge}</span>
          </button>
      </NavLink>
        </li>
    </li>
  </ul>
</div>

<div className="flex-grow m-20 mx-28">
  <Outlet></Outlet>
</div>
</div>


    );
};

export default EmployeeDashboard;