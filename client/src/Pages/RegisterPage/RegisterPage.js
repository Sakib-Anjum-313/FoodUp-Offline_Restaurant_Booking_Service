import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(null);
  // const [approved, setApproved] = useState(false);

  const { createUser, setLoading, updateUserProfile } = useContext(AuthContext);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`http://localhost:5000/users/${checkEmail?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => {});
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.ownerName.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
    setCheckEmail(email);

    fetch(
      `http://localhost:5000/resAdminCheck/${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          createUser(email, password)
            .then((result) => {
              console.log(result);
              const user = result.user;
              console.log(user);
              handleUpdateProfile(userName);
              Swal.fire({
                title: "Wow",
                text: "Registered Successfully",
                icon: "success",
              });
              // form.reset();
              navigate("/restaurantAdmin");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          Swal.fire("Sorry!", "This User Is Not Registered By Admin", "error");
        }
      });

    const handleUpdateProfile = (userName) => {
      const profile = {
        displayName: userName,
      };
      updateUserProfile(profile)
        .then(() => { })
      .catch((error)=> {console.error(error)})
    };
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register the Restaurant Owner</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Owner Name</span>
              </label>
              <input
                name="ownerName"
                type="text"
                placeholder="owner name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
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
              />
              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  want to Login?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

// if (approved) {
//   createUser(email, password)
//     .then((result) => {
//       console.log(result);

//       const user = result.user;
//       console.log(user);
//       // form.reset();
//       navigate("/restaurantAdmin/1");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// } else {
//   Swal.fire("Sorry!", "This User Is Not Registered By Admin", "error");
// }
