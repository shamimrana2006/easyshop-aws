import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simple fade-in animation delay
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-bg">
      <div className={`text-center transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-6xl font-extrabold text-danger mb-4">404</h1>
        <p className="text-xl text-text mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 text-white bg-primary hover:bg-hover rounded-lg transition-colors duration-300">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
