import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ show, setShow ] = useState()

  const handleClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    try {
      await createUser(emailValue, passwordValue).then((result) => {
        // const user = result.user
        if (result.user) {
          navigate("/setrole");
        }
      });
      console.log("User logged in successfully!");
      // Additional logic after successful login
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
      setError(error.message);
    }
  };

  const handlePasswordToggle = () => {
    setShow(!show);
  };

  return (
    // <div className="card">
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     className="input m-1 input-bordered input-accent w-full max-w-xs"
    //     ref={emailRef}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Password"
    //     className="input m-1 input-bordered input-accent w-full max-w-xs"
    //     ref={passwordRef}
    //   />
    //   <button className="btn btn-outline btn-primary m-1" onClick={handleClick}>
    //     Sign Up
    //   </button>
    // </div>

    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 border-[#e9e9e9] border-[0.2px] bg-base-100">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
              Sign Up
            </p>

            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="join">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input w-full input-bordered border-r-0 join-item"
                    ref={passwordRef}
                  />
                  <button
                    className="px-4 border-[.5px] border-l-0 join-item hover:text-primary"
                    onClick={handlePasswordToggle}>
                    {show ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <label className="label">
                  <p className="label-text-alt">
                    Already have an account?
                    <Link
                      to="/login"
                      className="label-text-alt link link-hover text-primary">
                      Login
                    </Link>
                  </p>
                </label>
                <span className="text-xs text-red-600">{error}</span>
              </div>
              <div className="form-control mt-6">
                <button className="btn-style" onClick={handleClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
