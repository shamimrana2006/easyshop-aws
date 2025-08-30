import React, { useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiHeart, CiMenuKebab, CiSettings, CiSun, CiUser } from "react-icons/ci";
import { FaBackward, FaCalendarMinus, FaFacebook, FaInstagram, FaLinkedin, FaMoon, FaSearch, FaSun, FaTwitter } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layout/Loading";
import { ThemeToggle, userLogout } from "../features/UserSlice";
import { Navigate } from "react-router";
import "./navbar.css";
const NavBar = () => {
  const userState = useSelector((state) => state.userStore);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDark, setIsdark] = useState(null);

  useEffect(() => {
    if (!userState?.theme) {
      setIsdark(null);
      document.documentElement.classList.remove("dark");
    } else {
      setIsdark(true);
      document.documentElement.classList.add("dark");
    }
  }, [userState]);
  const theme = JSON.parse(localStorage.getItem("theme"));
  const themeToggle = async () => {
    setIsdark(!isDark);
    const newTheme = !theme;
    localStorage.setItem("theme", newTheme);
    newTheme ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    await dispatch(ThemeToggle({ url: "/join/theme-toggle", method: "get" }));
  };

  const searchButton = () => {
    if (window.innerWidth > 768) return;
    document.querySelector(".searchINput").classList.toggle("!w-full");
    document.querySelector(".searchINput").classList.toggle("z-50");
    document.querySelector(".inputBox").classList.toggle("w-full");
    document.querySelector(".fnd").classList.toggle("hidden");
    document.querySelector(".lnd").classList.toggle("hidden");
    document.querySelector(".bkw").classList.toggle("hidden");
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      document.querySelector(".MenuVisible").classList.add("hidden");
    }
  });
  ////(location.pathname.includes("/user/profile"));

  if (userState.loading) return <Loading />;
  const logoutCall = () => {
    <Navigate to={"/"} />;
    dispatch(userLogout());
  };
  const menuList = (
    <>
      <NavLink className={"!px-2"} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"!px-2"} to={"/private"}>
        Private
      </NavLink>
      <NavLink className={"!px-2"} to={"/ment"} className="">
        {" "}
        man
      </NavLink>

      <NavLink className={"!px-2"} to={"/women"}>
        Women's
      </NavLink>
      <NavLink className={"!px-2"} to={"/jewelry"}>
        Jewelry
      </NavLink>
      <NavLink className={"!px-2"} to={"/Perfume"}>
        Perfume
      </NavLink>
      <NavLink className={"!px-2"} to={"/Blog"}>
        Blog
      </NavLink>
      <NavLink className={"!px-2"} to={"/offers"}>
        Hot Offers
      </NavLink>
    </>
  );
  const ifProfileSoHidden = location.pathname.includes("/user/profile") ? "" : "md:flex";
  return (
    <div className="sticky navmain top-0 z-50">
      <div  className="bg-bg text-text border-border">
        {/* topbar */}
        <div className={`bg-bg containerr hidden justify-between items-center py-2 ${ifProfileSoHidden} focus:text-ptext `}>
          <div className="socialIcons flex text-gray-500 gap-1">
            <FaFacebook className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaTwitter className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaInstagram className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaLinkedin className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
          </div>
          <span className="noticeTitle text-ptext uppercase font-bold">Free shipping this week order over - $55</span>
          <div className="flex gap-1 items-center  text-ptext justify-end">
            <select name="option" className="rounded transition-all bg-pbox duration-300 ease-in-out flex items-center text-center p-2 outline-none focus:outline-none focus:rounded focus:bg-ptext focus:border-none" id="option">
              <option value="usd">USD $</option>
              <option className="" value="TK">
                BDT ৳
              </option>
            </select>
            <select name="option" className="rounded transition-all bg-pbox duration-300 ease-in-out flex items-center text-center p-2 outline-none focus:outline-none focus:rounded focus:bg-ptext focus:border-none" id="option">
              <option value="English">English</option>
              <option className="" value="Bangla">
                Bangla
              </option>
            </select>
          </div>
        </div>
        {ifProfileSoHidden ? <div className="border-b border-border"></div> : ""}
        {/* navbar */}
        <div className="containerr relative py-3 flex justify-between items-center">
          <div className="fnd">
            <NavLink to={"/"}>
              <h1 className="font-bold md:text-4xl text-lg text-text fontLogo">Shop</h1>
            </NavLink>
          </div>
          {location.pathname.includes("/user/profile") ? (
            <></>
          ) : (
            <div className={`inputBox z-50 hidden md:flex gap-1  group p-2 px-5 items-center md:w-[60%]  border  border-border rounded-[14px] justify-between  `}>
              <FaBackward className="hidden mr-2 bkw" onClick={searchButton} />
              <FaSearch className="text-text hidden md:block group-hover:w-[15px] origin-top-right transition-all duration-300 ease-in-out w-0  mr-2" />
              <input type="text" className="searchINput md:w-full placeholder:text-ptext w-0 not-focus:w-0 md:not-focus:w-full  group-hover:w-full transition-all duration-300 ease-in-out group outline-none focus:outline-none border-none bg-transparent text-text" placeholder="Enter your product name..." />
              <FaSearch onClick={searchButton} className="text-ptext  md:block" />
            </div>
          )}
          <div className="md:flex flex lnd  gap-3 font-bold items-center text-4xl justify-center">
            <div className={`navITEMForUser gap-4 items-center justify-center ${userState?.user ? "flex" : "hidden"} `}>
              <div className="relative group">
                <div className="p-2 z-[99999] text-sm absolute  backdrop-blur-2xl flex-col gap-2 profileMenu rounded-2xl right-0 top-8 hidden group-hover:flex items-center-safe   justify-center">
                  <NavLink to={"/user/profile"} className=" w-full bg-ptext flex justify-between items-center text-[12px] p-[5px] rounded text-text cursor-pointer">
                    Profile
                    <CiUser />
                  </NavLink>
                  {userState?.user?.payLoad?.isAdmin ? (
                    <Link to={"/user/dashboard"} className=" w-full bg-ptext flex justify-between items-center gap-2 text-[12px] p-[5px] rounded text-text cursor-pointer ">
                      Dashboard
                      <FaCalendarMinus />
                    </Link>
                  ) : (
                    <></>
                  )}
                  <span onClick={logoutCall} className="w-full  bg-danger text-[12px] p-[5px] rounded text-white  cursor-pointer ">
                    Log Out
                  </span>
                  <button onClick={themeToggle} className="outline-none ">
                    <div
                      style={{
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                      }}
                      className={`p-2 flex transition-all duration-1000 justify-center items-center gap-3 ${!isDark ? "bg-black" : "bg-white"}  rounded-full  relative overflow-hidden`}>
                      <FaMoon className={`${isDark ? "text-black" : "text-white"}`} />
                      <FaSun className={`${isDark ? "text-black" : "text-white"}`} />
                      <div className={`w-7 h-7 ${isDark ? "bg-black left-[2px]" : "bg-white left-[27px]"}  rounded-full absolute transition-all duration-1000 ease-in-out`}></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() => {
                    document.querySelector(".profileMenu").classList.toggle("!flex");
                  }}
                  to={"/user/profile"}>
                  {" "}
                  <div className={`relative items-center justify-center border-2 ${userState?.user?.payLoad?.isVerified?.value ? "border-green-500" : "border-yellow-300"} ${userState?.user?.payLoad?.isBand ? "!border-red-500" : ""} rounded-full  w-10 h-10 flex`}>
                    <CiUser className="rounded-full bg-bg text-text p-1" />
                  </div>
                </div>
              </div>
              {location.pathname.includes("/user/profile") ? (
                ""
              ) : (
                <>
                  <div className="relative">
                    <span className="absolute w-4 h-4 right-0 -top-1 text-[0.8rem] flex items-center justify-center text-white rounded-full bg-danger">5</span>

                    <CiHeart />
                  </div>
                  <div className="relative">
                    <span className="absolute w-4 h-4 right-0 -top-1 text-[0.8rem] flex items-center justify-center text-white rounded-full bg-danger">50</span>
                    <IoBagHandleOutline />
                  </div>
                  <button onClick={() => document.querySelector(".MenuVisible").classList.toggle("hidden")} className="md:hidden block">
                    <CiMenuKebab className="" />
                  </button>
                </>
              )}
            </div>
            <div className={`flex items-center ${userState?.user ? "hidden" : ""}  justify-center gap-2`}>
              <NavLink to={"/auth/login"} className="btn ">
                Sign Up
              </NavLink>
            </div>
            {/* {"/user/profile" == location.pathname ? (
              ""
            ) : (
             
            )} */}
            <div className="absolute containerr hidden border MenuVisible top-12 text-sm bg-bg p-2 border-border rounded-[8px] ">
              <ul className="flex menuListLargeDevice md:text-sm flex-col   justify-center gap-2  font-bold uppercase">{menuList}</ul>
            </div>
          </div>
        </div>

        {ifProfileSoHidden ? <div className="border-b border-border"></div> : ""}

        {/* last navbar menu */}
        <div className={`  hidden containerr justify-center bg-bg text-text gap-2 py-3  items-center ${ifProfileSoHidden} `}>
          <ul className="flex z-50 menuListLargeDevice justify-center items-center lg:gap-18 md:gap-5 font-bold text-gray-500 uppercase">{menuList}</ul>
        </div>
        {ifProfileSoHidden ? <div className="border-b border-border"></div> : ""}
      </div>
    </div>
  );
};

export default NavBar;
