import React, { useEffect, useState } from "react";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/allRestaurantList")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRestaurants(result);
      });
  }, []);
  return (
    <div className="grid grid-cols-3 bg-slate-100 mt-10">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="mt-10 ml-12  ">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{restaurant.RestaurantName}</h2>
              <p>
                <span className="font-bold">Owner Name: </span>
                {restaurant.OwnerName}
              </p>
              <p>
                <span className="font-bold">City: </span> {restaurant.City}
              </p>
              <p>
                <span className="font-bold">Email: </span> {restaurant.Email}
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRestaurant;
