import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div className="navbar bg-base-100 drop-shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link>Item 1</Link>
            </li>
            <li tabIndex={0}>
              <Link className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </Link>
              <ul className="p-2">
                <li>
                  <Link>Submenu 1</Link>
                </li>
                <li>
                  <Link>Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link>Item 3</Link>
            </li>
          </ul>
        </div>
        <Link to={'/login'} className="btn btn-ghost normal-case text-xl">FoodUp</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Link to={"/adminPage"}>
          <button className="btn btn-outline btn-secondary text-md">
            Admin Panel
          </button>
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn">Get started</Link>
      </div>
    </div>
  );
};

export default AdminHeader;
