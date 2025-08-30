import React from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { FaForumbee, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { IoDocument, IoDocumentAttachOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router";
import "./profileCss.css";
const ProfileLayout = () => {
  const navItems = [
    { name: "Home", path: "." },
    { name: "Personal Info", path: "/user/profile/persionalInfo" },
    { name: "Security", path: "/user/profile/security" },
    { name: "Version", path: "/user/profile/Version" },
  ];
  return (
    <div className="">
      <div className="sidebar float-left text-text hidden md:block h-screen w-[280px] px-2">
        <div className="flex-col profileNave justify-center ">
          {navItems.map((item, index) => {
            return (
              <NavLink key={index} to={item.path} end className={({ isActive }) => `p-2 text-text rounded-br-2xl flex items-center gap-2 rounded-tr-2xl ${isActive ? "text-primary" : "text-black"}`}>
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="md:hidden  profileNab sticky top-0 scroll-auto overflow-auto w-full px-1 flex flex-row gap-2 py-1">
        {navItems.map((item, index) => {
          return (
            <NavLink key={index} to={item.path} className={`p-2 text-nowrap flex items-center flex-col text-[px] max-w-full hover:text-primary smooth-transition`}>
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div className="mainBox px-4">
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
