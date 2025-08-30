import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import Loading from "../../Layout/Loading";
import { useEffect, useState } from "react";
import { userDAtaProfile, userFetch } from "../../features/UserSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const PrivetRout = ({ children }) => {
  const user = useSelector((state) => state.userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (!user.user && !user?.loading) {
      return navigate("/auth/login", { replace: true });
    }
  }, [user.loading]);

  useEffect(() => {
    console.log(" ami hitted");
    
    dispatch(userDAtaProfile());
  }, [dispatch]);


  if (user?.loading) {
    return <Loading />;
  }
 

  return (
    <>
      {children}
      <div className="w-full transition-all duration-1000 h-screen flex justify-center items-center">
        
      </div>
    </>
  );
};

export default PrivetRout;
