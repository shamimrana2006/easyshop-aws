import "./login.css";
import Lottie from "lottie-react";
import loginLottie from "./Lottie/Login.json";
import { FaEye, FaLock, FaUser } from "react-icons/fa";
import { Link, Navigate, NavLink, useNavigate } from "react-router";
import { CiCalculator1 } from "react-icons/ci";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetstate, userFetch } from "../../features/UserSlice";
import Loading from "../../Layout/Loading";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user && !user.loading) {
      navigate("/");
    } else {
      ////("user not found");
      dispatch(resetstate());
    }
  }, [user.user]);

  const handle_Submitted = async (e) => {
    e.preventDefault();

    try {
      const formDAta = new FormData(e.target);
      const data = Object.fromEntries(formDAta.entries());

      await dispatch(userFetch({ url: "/join/registration", payload: data, method: "post" }));
      // if (user.user && !user.loading) {
      //   return navigate("/");
      // }
    } catch (error) {
      ////(error);
    }
  };

  ////(user);
  if (user.loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex   justify-center h-[100vh] bg-bg items-center relative ">
      <NavLink className={"btn  absolute z-50 top-5 left-5"} to={"/"}>
        Home
      </NavLink>
      <div className="bgLogin bg-cover bg-center bg-no-repeat bg-[url('https://wallpapershome.com/images/pages/ico_h/5708.jpg')] flex items-center w-screen justify-center h-screen">
        {/* lottie box start--------------- */}
        <div className="loginBox flex !text-white flex-col md:flex-row  justify-center items-center text-bg backdrop-blur-[3px] border-t-[1px] border-l shadow-2xl drop-shadow-2xl border-[#ffffff3f] p-10 rounded">
          <div>
            <h1 className="text-lg uppercase  text-center pb-4">Register</h1>
            <form onSubmit={handle_Submitted} className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between border-b pl-3 p-2 rounded-[15px] border-gray-300 items-center gap-2">
                <input name="name" type="text" className="outline-none " autoFocus placeholder="Full Name" />
                <CiCalculator1 />
              </div>
              <div className="flex justify-between border-b pl-3 p-2 rounded-[15px] border-gray-300 items-center gap-2">
                <input name="UserName" type="text" className="outline-none " placeholder="Username/email" />
                <FaUser />
              </div>
              <div className="flex justify-between border-b pl-3 p-2 rounded-[15px] border-gray-300 items-center gap-2">
                <input name="password" type={showPassword ? "text" : "password"} className="outline-none " placeholder="Confirm password" />
              </div>
              <div className="flex mb-2 justify-between items-center border-b pl-3 p-2 rounded-[15px] border-gray-300 gap-2">
                <input name="repassword" type={showPassword ? "text" : "password"} className="outline-none " placeholder="Confirm password" />
                <FaEye className={showPassword ? "hidden" : "block"} onClick={() => setShowPassword(true)} />
                <FaLock className={showPassword ? "block" : "hidden"} onClick={() => setShowPassword(false)} />
              </div>
              <span className="text-danger">{user?.error ? (user?.error?.payload?.message ? "" : user?.error?.payload == "user not found" ? "" : user?.error?.payload) : ""}</span>
              <button className="btn btn-sm mb-4 ">Register</button>
            </form>
            <span className="">
              Already account{" "}
              <Link className={"text-primary hover:underline"} to={"/auth/login"}>
                Login
              </Link>
            </span>
          </div>
          <div className="w-60 md:w-80  ">
            {" "}
            <Lottie animationData={loginLottie} loop={true} />
          </div>
        </div>
        {/* <div className="loginBox text-bg backdrop-blur-[3px] border-t-[1px] border-l shadow border-[#ffffff3f] p-10 rounded">
        </div> */}
      </div>
    </div>
  );
};

export default Register;
