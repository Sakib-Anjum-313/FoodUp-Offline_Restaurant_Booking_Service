import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const ResAdminRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  

  if (loading) {
    return (
      <button className="btn loading flex justify-self-center">loading</button>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default ResAdminRoute;
