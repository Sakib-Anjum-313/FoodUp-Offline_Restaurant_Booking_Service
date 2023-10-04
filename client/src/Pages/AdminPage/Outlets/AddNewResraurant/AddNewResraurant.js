import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddNewResraurant = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure you want to insert this restaurant?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/admin/addNewRestaurant", data)
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Wow",
                text: "Restaurant inserted successfully",
                icon: "success",
              });
              reset();
            } else {
              Swal.fire(
                "Sorry!",
                "Some Error occure from Database, Try Again Later",
                "error"
              );
            }
          });
          
        }
      else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleEmailValidation = (e) => {
    console.log(e.target.value);
    setIsLoading(true);

    setInterval(() => {
      setIsLoading(false);
    }, 8000);
  };

  return (
    <div className="flex justify-center mt-10 bg-slate-100">
      <div className="  w-1/2 p-4 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1   ">
            <div className="flex flex-col my-4">
              <label>Owner Full Name:</label>
              <input
                {...register("OwnerName", { required: true })}
                type="text"
                placeholder="Type here"
                className="my-3 input input-bordered input-info w-full "
              />
              {errors.ownerName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label>Restaurant Name:</label>
              <input
                {...register("RestaurantName", { required: true })}
                type="text"
                placeholder="Type here"
                className="my-3 input input-bordered input-info w-full "
              />
              {errors.restaurantName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label>Email:</label>
              <input
                {...register("Email", { required: true })}
                type="email"
                onBlur={handleEmailValidation}
                placeholder="Type here"
                className="my-3 input input-bordered input-info w-full "
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
              {isLoading && <progress className="progress w-56"></progress>}
            </div>

            <div className="flex flex-col mt-3">
              <label>City:</label>
              <input
                {...register("City", { required: true })}
                type="text"
                placeholder="Type here"
                className="my-3 input input-bordered input-info w-full "
              />
              {errors.city && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="my-4 w-1/4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewResraurant;
