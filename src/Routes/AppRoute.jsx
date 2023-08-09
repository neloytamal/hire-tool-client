import 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Signup/Signup';
import SetRole from '../Pages/SetRole/SetRole';
import Login from '../Pages/Login/Login';
import SetComPanyProfile from '../Pages/SetCompanyProfile/SetComPanyProfile';
import ApprovalPage from '../Pages/ApprovalPage/ApprovalPage';
import Dashboard from '../Pages/Dashboard/Dashboard';
import MyProfile from '../Pages/Dashboard/EmployeeDashboard/Components/MyProfile';
import UpdateEmployeeProfile from '../Pages/Dashboard/EmployeeDashboard/Components/UpdateEmployeeProfile';
import SavedJobs from '../Pages/Dashboard/EmployeeDashboard/Components/SavedJobs';
import AppliedJobs from '../Pages/Dashboard/EmployeeDashboard/Components/AppliedJobs';
import EmployeeNotifications from '../Pages/Dashboard/EmployeeDashboard/Components/EmployeeNotifications';
import CompanyProfile from '../Pages/Dashboard/CompanyDashboard/Components/CompanyProfile';
import Applicants from '../Pages/Dashboard/CompanyDashboard/Components/Applicants';
import AddJobs from '../Pages/Dashboard/CompanyDashboard/Components/AddJobs';
import CompanyNotifications from '../Pages/Dashboard/CompanyDashboard/Components/Notification/CompanyNotifications'
import UpdateCompanyProfile from '../Pages/Dashboard/CompanyDashboard/Components/UpdateCompanyProfile';
import PostedJobs from '../Pages/Dashboard/CompanyDashboard/Components/PostedJobs/PostedJobs';
import EmployeesAppliedForJob from '../Pages/Dashboard/CompanyDashboard/Components/PostedJobs/EmployeesAppliedForJob';
import ShowEmployeeDetails from '../Pages/Dashboard/CompanyDashboard/Components/ShowEmployeeDetails';
import SetEmployeeProfile from '../Pages/SetEmployeeProfile/SetEmployeeProfile';
import ShowAllJobs from '../Pages/ShowAllJobs/ShowAllJobs';
import EmployeeSeesJobDetails from '../Pages/ShowAllJobs/EmployeeSeesJobDetails/EmployeeSeesJobDetails';
import ShowAllPendingCompany from '../Pages/Dashboard/SuperAdminDashboard/Components/ShowAllPendingCompany';
import ShowAllActiveEmployees from '../Pages/Dashboard/SuperAdminDashboard/Components/ShowAllActiveEmployees';
import ShowAllRegisteredCompany from '../Pages/Dashboard/SuperAdminDashboard/Components/ShowAllRegisteredCompany';
import RejectedCompany from '../Pages/Dashboard/SuperAdminDashboard/Components/RejectedCompany';
import Review from '../Pages/Reviews/Review';
import RequireAuth from '../Components/RequireAuth/RequireAuth';
import ContactUs from '../Pages/ContactUs/ContactUs';


    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,//////////////
          children: [
            {
              path: "/",
              element: <Home></Home>//////////////
            },{
              path:"/signup",
              element:<Signup></Signup>///////////
            },{
              path: "/setrole",
              element: <RequireAuth><SetRole></SetRole></RequireAuth>////////////
            },{
              path: "/login",
              element: <Login></Login>//////////////////
            },{
              path: "/set-company-profile",
              element: <SetComPanyProfile></SetComPanyProfile>/////////////////
            },{
              path: "/set-employee-profile",
              element: <SetEmployeeProfile></SetEmployeeProfile>//////////////////
            },{
              path:"/approval",
              element:<ApprovalPage></ApprovalPage>//////////////
            },{
              path:"/show-all-jobs",
              element:<ShowAllJobs></ShowAllJobs>///////////
            },{
              path:"/contact-us",
              element: <ContactUs></ContactUs>
            },{
              path:"/review",
              element: <RequireAuth><Review></Review></RequireAuth>/////////
            },{
              element:<RequireAuth><EmployeeSeesJobDetails></EmployeeSeesJobDetails></RequireAuth>,
              path:"/:_id"
            },{
              path:"/dashboard",
              element:<RequireAuth><Dashboard></Dashboard></RequireAuth>, //////////
              children: [
                {
                  index: true,
                  path:"/dashboard/my-profile", //employee profile
                  element:<MyProfile></MyProfile>
                },{
                  path:"/dashboard/update-employee-profile",
                  element:<UpdateEmployeeProfile></UpdateEmployeeProfile> /////
                },{
                  path:"/dashboard/saved-jobs",
                  element:<SavedJobs></SavedJobs> ///////
                },{
                  path:"/dashboard/applied-jobs",
                  element:<AppliedJobs></AppliedJobs>
                },{
                  path:"/dashboard/employee-notifications",
                  element:<EmployeeNotifications></EmployeeNotifications>
                },{
                  path:"/dashboard/company-profile",
                  element:<CompanyProfile></CompanyProfile>//////
                },{
                  path:"/dashboard/update-company-profile",
                  element:<UpdateCompanyProfile></UpdateCompanyProfile>/////////
                },{
                  path:"/dashboard/show-applicants",
                  element:<Applicants></Applicants>
                },{
                  path:"/dashboard/show-company-posted-jobs",
                  element:<PostedJobs></PostedJobs>///////
                },{
                  path:"/dashboard/company-notifications",
                  element:<CompanyNotifications></CompanyNotifications>
                },{
                  path:"/dashboard/add-jobs",
                  element:<AddJobs></AddJobs>///////////
                },{
                  path:"/dashboard/show-who-applied",
                  element:<EmployeesAppliedForJob></EmployeesAppliedForJob>/////////
                },{
                  path:"/dashboard/show-employee-details/:email",
                  element:<ShowEmployeeDetails></ShowEmployeeDetails>///////////
                },{
                  path:"/dashboard/show-pending-company",
                  element:<ShowAllPendingCompany></ShowAllPendingCompany>///////////333333333
                },{
                  path:"/dashboard/show-all-active-employee",
                  element:<ShowAllActiveEmployees></ShowAllActiveEmployees>//3333333333333
                },{
                  path:"/dashboard/show-all-registered-company",
                  element:<ShowAllRegisteredCompany></ShowAllRegisteredCompany>//33333333333333
                },{
                  path:"/dashboard/show-all-rejected-company",
                  element:<RejectedCompany></RejectedCompany>//////////33333333333
                }
              ]//dashboard array finishes here
            }
          ],//main layout array finishes here
        },
        
      ]);
  


export default router;