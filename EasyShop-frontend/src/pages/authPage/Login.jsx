import "./login.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginLottie from "./Lottie/Login.json";
import { FaEye, FaLock, FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../Layout/Loading";
import { resetstate, userFetch } from "../../features/UserSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const user = useSelector((state) => {
    return state.userStore;
  });

  const dispath = useDispatch();
  useEffect(() => {
    if (user.user && !user.loading) {
      navigate("/");
    } else {
      dispath(resetstate());
    }
  }, [user.user]);

  if (user.loading) {
    return <Loading></Loading>;
  }

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (!userName && !Password) return;
    const result = dispath(
      userFetch({
        method: "post",
        url: "/join/login",
        payload: { UserName: userName, password: Password },
      })
    ).unwrap();

    toast.promise(result, {
      pending: "login in...",
      success: "login successfully",
      error: {
        render({ data }) {
          return data || "something went wrong";
        },
      },
    });
    // userFetch.fulfilled.match(result) ? toast("shamim working") : alert("not working shamim");
  };

  return (
    <div className="flex justify-center h-[100vh] bg-bg items-center relative ">
      <NavLink className={"btn  absolute z-50 top-5 left-5"} to={"/"}>
        Home
      </NavLink>

      <div className="bgLogin bg-cover bg-center bg-no-repeat bg-[url('https://e0.pxfuel.com/wallpapers/177/754/desktop-wallpaper-cool-for-phone-heroscreen-cool-for-phones-cool-background-vaporwave-chill-neon.jpg')] flex items-center w-screen justify-center h-screen">
        {/* lottie box start--------------- */}
        <div className="loginBox flex-col-reverse !text-white flex  md:flex-row  gap-5 justify-center items-center backdrop-blur-[10px] border-t-[1px] border-l md:px-20  shadow-2xl drop-shadow-2xl border-[#ffffff3f] p-10 rounded">
          <div>
            <h1 className="text-lg hidden md:block uppercase  text-center pb-4">login</h1>
            <form onSubmit={HandleLogin}>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center gap-2 border-b pl-3 p-2 rounded-[15px] border-gray-300">
                  <input onChange={(e) => setUserName(e.target.value)} type="text" className="outline-none " autoFocus placeholder="Username" />
                  <FaUser />
                </div>
                <div className="flex justify-between items-center gap-2 border-b pl-3 p-2 rounded-[15px] border-gray-300">
                  <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="outline-none " placeholder="password" />
                  <FaEye className={showPassword ? "hidden" : "block"} onClick={() => setShowPassword(true)} />
                  <FaLock className={showPassword ? "block" : "hidden"} onClick={() => setShowPassword(false)} />
                </div>
                <span className="">
                  <Link className={"text-primary hover:underline"} to={"/auth/forgot_password"}>
                    Forgot Password
                  </Link>
                </span>
                <span className="text-danger">{user?.error ? (user?.error?.payload?.message ? "" : user?.error?.payload) : ""}</span>
                <button className="btn btn-sm mt-4">Login</button>
                <span className=" mt-4">
                  New to EasyShop{" "}
                  <Link className={"text-primary hover:underline"} to={"/auth/register"}>
                    Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
          <div className="w-60 md:w-80  ">
            {" "}
            <h1 className="text-lg md:hidden block uppercase font-bold  text-center pb-4">login</h1>
            <Lottie animationData={loginLottie} loop={true} />
          </div>
        </div>
        {/* <div className="loginBox text-bg backdrop-blur-[3px] border-t-[1px] border-l shadow border-[#ffffff3f] p-10 rounded">
        </div> */}
      </div>
    </div>
  );
};

export default Login;
