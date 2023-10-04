import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const LoginPage = () => {
  const {
    user,
    setUser,
    logInUser,
    logOutUser,
    isLogIn,
    setIsLogIn,
    setLoading,
    checkLogIn,
    setCheckLogIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isResAdmin, setIsResAdmin] = useState(false);

  // location = { state: {from :''} };

  // let verifiedId = location.state;
  // console.log(verifiedId);

  // const from = location.state?.from?.pathname || '/';

  const handleUserRole = (email, password) => {
    fetch(`http://localhost:5000/loginCheck/checkingUserRole/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Role === "ResAdmin") {
          setIsAdmin(false);
          setIsResAdmin(true);
          logInUser(email, password)
            .then((result) => {
              console.log(result);
              setIsLogIn(true);
              setCheckLogIn(false);

              navigate(`/restaurantAdmin`);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (data.Role === "Admin") {
          logInUser(email, password).then((result) => {
            console.log(result);
            setIsLogIn(true);
            setCheckLogIn(false);
            navigate("/adminPage");
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckLogIn(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (isLogIn) {
      // setLoading(true);
      setCheckLogIn(true);

      logOutUser()
        .then(() => {
          setLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });

      handleUserRole(email, password);
    } else {
      handleUserRole(email, password);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 border shadow-lg">
        <div className="flex-1 ">
          <button className="font-semibold text-xl ml-3">FoodUp</button>
          <Link
            to={"/"}
            className="btn btn-primary normal-case text-lg ml-3 font-semibold"
          >
            <button>Go Back</button>
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left ml-3">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <p className="font-bold">For Quick Test:</p>
            <div className="grid grid-cols-10 mb-4 mt-3">
              <div className=" col-span-4">
                <div className="font-bold mr-1 underline underline-offset-auto">
                  Admin Page:
                </div>
                <div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    admin@admin.com
                  </div>
                  <div>
                    <span className="font-semibold">Password: </span> 123456
                  </div>
                </div>
              </div>
              <div className=" col-span-6">
                <div className="font-bold mr-1 underline underline-offset-auto">
                  Restaurant Admin Page:{" "}
                </div>
                <div>
                  <div>
                    <span className="font-semibold">Email: </span>{" "}
                    test@gmail.com
                  </div>
                  <div>
                    <span className="font-semibold">Password: </span> 123456
                  </div>
                </div>
              </div>
            </div>

            <Link className="mr-6" to={"/adminPage"}>
              <button className="btn btn-success">Admin</button>
            </Link>
            <Link to={"/restaurantAdmin"}>
              <button className="btn btn-warning">Res Admin</button>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link
                    to={"/register"}
                    className="label-text-alt link link-hover"
                  >
                    Not Registered?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                {checkLogIn ? (
                  <button className="btn btn-primary loading hover:bg-sky-600">
                    LOGIN
                  </button>
                ) : (
                  <button className="btn btn-primary">LOGIN</button>
                )}
                {/* <button type="submit" className="btn btn-primary">
                {!checkLogIn && (
                  <span className="btn btn-primary border-none loading"></span>
                )}
                Login
              </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
