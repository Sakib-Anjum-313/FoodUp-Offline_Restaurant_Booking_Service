import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImg from "../../../Assets/img/user.jpg";
import { AuthContext } from "../../../Context/AuthProvider";

const ResAdminHeader = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { isLogIn, setIsLogIn } = useContext(AuthContext);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {setIsLogIn(false);})
      .catch((error) => {
        console.error(error);
      });
  };
  

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
        <Link to={"/login"} className="btn btn-ghost normal-case text-xl">
          FoodUp
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <button className="btn btn-info">Restaurant Admin</button>
        {/* <ul className="menu menu-horizontal px-1">
          <li>
            <div>
              <button className="btn btn-info">Info</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
            </div>
          </li>
          <li tabIndex={0}>
            <Link>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
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
        </ul> */}
      </div>
      <div className="navbar-end">
        {user?.uid && (
          <>
            {user?.displayName && <p className="mr-2">{user?.displayName}</p>}
            <label className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userImg} alt="" />
              </div>
            </label>
            <button onClick={handleLogOut} className="btn btn-active btn-ghost">
              LogOut
            </button>
          </>
        )}
        <Link to={"/login"}>
          <button className="btn btn-error ml-3">Get Login</button>
        </Link>
      </div>
    </div>
  );
};

export default ResAdminHeader;
