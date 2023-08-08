import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    logoutpage();
  }, []);

  const logoutpage = () => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    // Clear session storage
    sessionStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
