import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userFetch, userDAtaProfile } from "./features/UserSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore);
  useEffect(() => {
    console.count("appwrapper");
    // dispatch(userFetch({ url: "/join/profile" }));
    dispatch(userDAtaProfile());
  }, [dispatch, Cookies.get("token")]);

  useEffect(() => {
    localStorage.setItem("theme", user?.theme ? "true" : "false");
  }, [user]);

  ////(user);

  return children;
}
