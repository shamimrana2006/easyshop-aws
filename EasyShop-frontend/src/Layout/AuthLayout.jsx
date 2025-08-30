import React from "react";
import { Outlet } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
const Auth = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;
