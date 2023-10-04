import React from "react";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const links = [
    { name: "All Restaurants List", href: "/adminPage/allRestaurantList" },
    { name: "+ Add A New Restaurant", href: "/adminPage/addNewRestaurant" },
    { name: "Approve List", href: "/adminPage/approved" },
  ];

  return (
    <div className="mt-10 ml-10">
      <div className="">
        {/* {links.map((link) => (
          <Link
            key={link.name}
            className={({ isActive }) => {
              console.log(link.href + " " + isActive);
            }}
            to={link.href}
          >
            <button className="btn btn-info ml-3 shadow-md">{link.name}</button>
          </Link>
        ))} */}
        <Link to={"/adminPage/allRestaurantList"}>
          <button className="btn btn-info ml-3 shadow-md">
            All Restaurants List
          </button>
        </Link>

        <Link to={"/adminPage/addNewRestaurant"}>
          <button className="btn bg-lime-300 text-lime-800 border-none ml-3 shadow-md hover:bg-lime-300">
            + Add A New Restaurant
          </button>
        </Link>
        <Link to={"/adminPage/approved"}>
          <button className="btn btn-warning ml-3 shadow-md">
            Approve List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashBoard;
