import { NavLink, Outlet } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    //       <div className="drawer lg:drawer-open">
    // <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    // <div className="drawer-content flex flex-col items-center justify-center">
    //   {/* Page content here */}
    //   <Outlet></Outlet>
    //   <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

    // </div>
    // <div className="drawer-side">
    //   <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
    // <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
    //   {/* Sidebar content here */}
    //   <NavLink   className={({ isActive, =>
    // isActive ? "text-primary" : "text-black"} to="/dashboard/company-profile" ><li><button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">Company Profile</button></li></NavLink>
    //   <NavLink   className={({ isActive, =>
    // isActive ? "text-primary" : "text-black"} to="/dashboard/update-company-profile" ><li><button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">Update Company Profile</button></li></NavLink>
    //
    //
    //
    //
    // </ul>

    // </div>
    //       </div>

    <div>
      {/* dashboard */}
      <div className="flex min-h-screen">
        <div className="p-6 w-80 focus:text-indigo-100 md:relative z-[9] text-base-content h-screen bg-base-100 border-r-[0.5px]">
          <ul className="space-y-2">
            <li>
                <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/company-profile">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Company Profile
                  </button>
              </NavLink>
                </li>
            </li>
            <li>
                <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/update-company-profile">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Update Company Profile
                  </button>
              </NavLink>
                </li>
            </li>
            <li>
                <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/show-company-posted-jobs">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Posted Jobs
                  </button>
              </NavLink>
                </li>
            </li>
            <li>
                {/* <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/show-applicants">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Applicants
                  </button>
              </NavLink>
                </li> */}
           
            </li>
            <li>
                <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/company-notifications">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Notifications
                  </button>
              </NavLink>
                </li>
            </li>
            <li>
                <li>
              <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard/add-jobs">
                  <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                    Add Job
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
    </div>
  );
};

export default CompanyDashboard;
