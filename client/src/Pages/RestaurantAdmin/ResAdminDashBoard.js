import React from "react";
import { Link } from "react-router-dom";

const ResAdminDashBoard = () => {
  // const {user, } = useContext(AuthContext);
  return (
    <div className="mt-10 ml-10">
      <div className="">
        <Link to={`/restaurantAdmin/myRestaurant`}>
          <button className="btn btn-outline ml-4 shadow-xl">
            My Restaurant
          </button>
        </Link>

        <Link to={"/restaurantAdmin/myOrders"}>
          <button className="btn btn-outline btn-primary ml-4 shadow-xl">
            My Orders
          </button>
        </Link>
        <Link to={"/restaurantAdmin/menuEdit"}>
          <button className="btn btn-outline btn-primary ml-4 shadow-xl">
            <span>
              Edit <span className="font-bold">Menu</span>
            </span>
          </button>
        </Link>
        <Link to={"/restaurantAdmin/editTableInfo"}>
          <button className="btn btn-outline btn-secondary ml-4 shadow-xl">
            Edit Table Info
          </button>
        </Link>
        <Link to={"/restaurantAdmin/liveTableTracking"}>
          <button className="btn btn-outline btn-accent ml-4 shadow-xl">
            Live Table Tracking
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResAdminDashBoard;
