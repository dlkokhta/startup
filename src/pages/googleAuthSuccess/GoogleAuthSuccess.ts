import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GoogleAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");

    if (accessToken) {
      // Store access token (localStorage or context)
      sessionStorage.setItem("accessToken", accessToken);

      // Redirect user to main page
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return "Loading...";
};
