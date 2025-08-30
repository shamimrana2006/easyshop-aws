import "./login.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginLottie from "./Lottie/Login.json";
import { FaEye, FaLock, FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../Layout/Loading";
import { resetPassOTP, resetstate, userFetch } from "../../features/UserSlice";
import { toast } from "react-toastify";
import { PulseLoader, ScaleLoader } from "react-spinners";

const ForgotPassword = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const user = useSelector((state) => {
    return state.userStore;
  });

  useEffect(() => {
    dispath(resetstate());
  }, []);
  ////(localStorage.getItem("ResetPassEmail"));

  const HandleSendOTP = async (e) => {
    e.preventDefault();
    if (!Email) return;
    const result = dispath(resetPassOTP({ email: Email })).then((res) => {
      if (resetPassOTP.fulfilled.match(res)) {
        localStorage.setItem("ResetPassEmail", Email);
        navigate("/auth/forgot_OTP");
      }
    });
  };

  console.log(user.error);
  console.log(user.error?.payload?.response?.data || user?.error?.message || "something went wrong");

  const errorShow = user?.error?.message;

  if (user.loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex justify-center h-[100vh] bg-bg items-center relative ">
      <NavLink className={"btn  absolute z-50 top-5 left-5"} to={"/"}>
        Home
      </NavLink>

      <div className="bgLogin bg-cover bg-center bg-no-repeat bg-[url('https://e0.pxfuel.com/wallpapers/177/754/desktop-wallpaper-cool-for-phone-heroscreen-cool-for-phones-cool-background-vaporwave-chill-neon.jpg')] flex items-center w-screen justify-center h-screen">
        {/* lottie box start--------------- */}
        <div className="loginBox flex-col-reverse !text-white flex  md:flex-row  gap-5 justify-center items-center backdrop-blur-[10px] border-t-[1px] border-l md:px-20  shadow-2xl drop-shadow-2xl border-[#ffffff3f] p-10 rounded">
          <div>
            <h1 className="text-lg hidden md:block uppercase  text-center pb-4">reset password</h1>
            <form onSubmit={HandleSendOTP}>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center gap-2 border-b pl-3 p-2 rounded-[15px] border-gray-300">
                  <input onChange={(e) => setEmail(e.target.value)} type="email" required className="outline-none " autoFocus placeholder="Email/phone" />
                  <FaUser />
                </div>

                <span className="">
                  <Link className={"text-primary hover:underline"} to={"/auth/login"}>
                    Login with Password
                  </Link>
                </span>
                <span className="text-danger">{errorShow}</span>
                <button className="btn btn-sm mt-4 flex gap-1 items-center justify-center "> {user?.loadingsendotp ? <ScaleLoader color="white" height={15} /> : ""} Send OTP</button>
                <span className=" mt-4">
                  New to EasyShop{" "}
                  <Link className={"text-primary"} to={"/auth/register"}>
                    Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
          {/* <div className="w-60 md:w-80  ">
            {" "}
            <h1 className="text-lg md:hidden block uppercase font-bold  text-center pb-4">login</h1>
            <Lottie animationData={loginLottie} loop={true} />
          </div> */}
        </div>
        {/* <div className="loginBox text-bg backdrop-blur-[3px] border-t-[1px] border-l shadow border-[#ffffff3f] p-10 rounded">
        </div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
