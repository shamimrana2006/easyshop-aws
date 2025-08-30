import "./login.css";
import { color, motion } from "framer-motion";
import Lottie from "lottie-react";
import loginLottie from "./Lottie/Login.json";
import { FaEye, FaLock, FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../Layout/Loading";
import { resetOTPTOKenCreate, resetPassOTP, resetstate, userFetch } from "../../features/UserSlice";
import { toast } from "react-toastify";

const ForgotPasswordOTP = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const OTPREf = useRef("otp");
  const user = useSelector((state) => {
    return state.userStore;
  });

  console.log(user);

  const email = localStorage.getItem("ResetPassEmail");
  useEffect(() => {
    if (user.user && !user.loading) {
      navigate("/");
    } else {
      dispatch(resetstate());
    }
  }, [user.user]);

  const resentOTP = async () => {
    const result = dispatch(resetPassOTP({ email })).unwrap();

    toast.promise(result, {
      pending: "otp resending...",
      success: "OTP send successfully ",
      error: {
        render({ data }) {
          return data.message || data || "something went wrong";
        },
      },
    });
  };

  const CheckOTP = async (e) => {
    e.preventDefault();

    const otp = OTPREf.current.value;
    const result = dispatch(resetOTPTOKenCreate({ email, otp, resetpass: true })).unwrap();

    toast.promise(result, {
      pending: "otp checking...",
      success: {
        render() {
          navigate("/auth/resetPass");
          return "You can change your password validity in 5 minute";
        },
      },
      error: {
        render({ data }) {
          return data || data?.message || "something went wrong";
        },
      },
    });
  };

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
            <h1 className="text-lg hidden md:block uppercase  text-center pb-4">valid otp</h1>
            <form onSubmit={CheckOTP}>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center gap-2 border-b pl-3 p-2 rounded-[15px] border-gray-300">
                  <input ref={OTPREf} onChange={(e) => setEmail(e.target.value)} type="number" required className="outline-none " autoFocus placeholder="OTP only 6 digit" />
                  <FaUser />
                </div>

                <span className="">
                  <span onClick={resentOTP} className={"text-primary hover:underline"}>
                    Resend OTP
                  </span>
                </span>
                <span className="text-danger">{user?.error ? (user?.error?.payload?.message ? "" : user?.error?.payload) : ""}</span>
                <button className="btn btn-sm mt-4">Verify OTP</button>
                <span className=" mt-4">
                  Login with Password{" "}
                  <Link className={"text-primary"} to={"/auth/login"}>
                    Password
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

export default ForgotPasswordOTP;
