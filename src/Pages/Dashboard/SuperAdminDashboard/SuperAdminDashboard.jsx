import { NavLink, Outlet } from "react-router-dom";

const SuperAdminDashboard = () => {
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
    //   <Link to="/dashboard/show-pending-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all pending company</button></li></Link>
    //   <Link to="/dashboard/show-all-active-employee" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all active company</button></li></Link>
    //   <Link to="/dashboard/show-all-registered-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all registered company</button></li></Link>
    //   <Link to="/dashboard/show-all-rejected-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Rejected Companies</button></li></Link>
    // </ul>

    // </div>
    //       </div>

    <div className="flex min-h-screen">
      <div className="p-6 w-80 focus:text-indigo-100 md:relative z-[9] text-base-content h-screen bg-base-100 border-r-[0.5px]">
        <ul className="space-y-2">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="/dashboard/show-pending-company">
              <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                Pending Companies<span></span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="/dashboard/show-all-registered-company">
              <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                Registered Companies<span></span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="/dashboard/show-all-rejected-company">
              <button className="relative font-medium  p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100">
                Rejected Companies<span></span>
              </button>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-grow m-20 mx-28">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
