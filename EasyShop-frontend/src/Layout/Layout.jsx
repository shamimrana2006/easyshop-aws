import axios from "axios";
import React, { useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { userFetch } from "../features/UserSlice";

const Layout = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(userFetch({ url: "/join/profile" }));
  // }, []);
  return (
    <div>
      {/* <div className="pt-2 flex justify-center gap-2 ">
        <NavLink className={"p-2 rounded-2xl bg-gray-400"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"p-2 rounded-2xl bg-gray-400"} to={"/auth/login"}>
          login
        </NavLink>
        <NavLink
          className={"p-2 rounded-2xl bg-gray-400"}
          to={"/auth/register"}
        >
          Register
        </NavLink>
        <NavLink className={"p-2 rounded-2xl bg-gray-400"} to={"/user/profile"}>
          Profile
        </NavLink>
        <div onClick={()=>document.documentElement.classList.toggle("dark")} className={"p-2 select-none cursor-pointer rounded-2xl bg-gray-400"} >
          {"Dark"}
        </div>
      </div> */}
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
