import 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import jobSeeker from "../../assets/Search engines-bro.svg";
import jobGiver from "../../assets/Recommendation letter-bro.svg";

const SetRole = () => {

    const {user} = useContext(AuthContext)
    const [userRole, setUserRole] = useState("")
    const navigate = useNavigate()


    const handleOnclickCompany =async () => {
        setUserRole("company")
        console.log(userRole)
        localStorage.setItem("role", "company");
        let data = {
            displayName:user.displayName,
            email:user.email,
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            uid:user.uid,
          }
                
          if (user) {
            const storedRole = localStorage.getItem("role");

            data = {
                ...data,
                role: storedRole
            }
            console.log(data,userRole)
          axios.post("https://elegant-bd-jobs.onrender.com/create-new-user-company", data)
          .then((res)=>{
              // console.log("response in signup page line 26",res.data.request)
              if (res.data.request==="success") {
                // console.log("user create kam kore")
                Swal.fire(
                  '',
                  'Your profile created successfully',
                  'success'
                )
                navigate("/set-company-profile")
                localStorage.removeItem("role");      
              }
          }).catch((error)=>{
              console.error("error from signup",error)
          })
      }
    }

    const handleOnclickEmployee = () => {
     

        /********just for testing perpouse*****/
        localStorage.setItem("role", "employee");
        let data = {
            displayName:user.displayName,
            email:user.email,
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            uid:user.uid,
          }
                
          if (user) {
            const storedRole = localStorage.getItem("role");

            data = {
                ...data,
                role: storedRole
            }
            console.log(data,userRole)
          axios.post("https://elegant-bd-jobs.onrender.com/create-new-user-employee", data)
          .then((res)=>{
              // console.log("response in signup page line 26",res.data.request)
              if (res.data.request==="success") {
                // console.log("user create kam kore")
                Swal.fire(
                  '',
                  'Your profile created successfully',
                  'success'
                )
                navigate("/set-employee-profile")
                localStorage.removeItem("role");      
              }
          }).catch((error)=>{
              console.error("error from signup",error)
          })
      }
        /********just for testing perpouse *****/


    }



    return (
        <div>
            {/* <button className="btn btn-outline btn-primary" onClick={handleOnclickCompany}>Company</button>
            <button className="btn btn-outline btn-secondary" onClick={handleOnclickEmployee}>Employee</button>
            <Toaster /> */}



            <div className="w-full justify-center flex flex-col items-center min-h-screen">
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Select your role
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:w-[45vw] w-[90vw] gap-5">
        <div
          className="card card-style cursor-pointer bg-white" onClick={handleOnclickEmployee}>
          <figure>
            <img
              src={jobSeeker}
              alt="Shoes"
              className="h-64"
              height={250}
              width={250}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">Employee</h2>
          </div>
        </div>
        <div
          className="card card-style cursor-pointer bg-white" onClick={handleOnclickCompany}>
          <figure>
            <img
              src={jobGiver}
              alt="Shoes"
              className="h-64"
              height={250}
              width={250}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">
              Company
            </h2>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default SetRole;

































