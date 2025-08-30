import { Route, Routes, useLocation } from "react-router";
import Auth from "../Layout/AuthLayout";
import Login from "../pages/authPage/Login";
import Profile from "../pages/IsLoginPages/User/Profile";
import User from "../Layout/UserLayout";
import Layout from "../Layout/Layout";
import Register from "../pages/authPage/Register";
import NotFound from "../pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { PageTransitionFade } from "../components/PageTnsition";
import PrivetRout from "../pages/privetPage/Private";
import ProfileLayout from "../Layout/ProfileLayout";
import ForgotPassword from "../pages/authPage/ForgotPassword";
import { ToastContainer } from "react-toastify";
import ForgotPasswordOTP from "../pages/authPage/ForgotPasswordOTP";
import NewPass from "../pages/authPage/NewPass";
import PersionalInfo from "../pages/IsLoginPages/User/PersionalInfo";
import ActivationOTP from "../pages/authPage/ActivationOTP";

const Router_Custom = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransitionFade key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route path="user" element={<User />}>
                <Route
                  path="profile"
                  element={
                    <PrivetRout>
                      <ProfileLayout></ProfileLayout>
                    </PrivetRout>
                  }>
                  <Route index element={<Profile />}></Route>
                  <Route path="active_with_otp" element={<ActivationOTP />}></Route>
                  <Route path="persionalInfo" element={<PersionalInfo/>}></Route>
                  <Route path="security" element="shamim"></Route>
                  <Route path="*" element={<NotFound></NotFound>}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="/auth" element={<Auth />}>
              <Route path="Register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot_password" element={<ForgotPassword />} />
              <Route path="forgot_OTP" element={<ForgotPasswordOTP />} />
              <Route path="resetPass" element={<NewPass />} />
            </Route>
            <Route
              path="/private"
              element={
                <PrivetRout>
                  <h1>Shamim</h1>
                </PrivetRout>
              }></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransitionFade>
      </AnimatePresence>
      <ToastContainer />
    </>
  );
};

export default Router_Custom;
