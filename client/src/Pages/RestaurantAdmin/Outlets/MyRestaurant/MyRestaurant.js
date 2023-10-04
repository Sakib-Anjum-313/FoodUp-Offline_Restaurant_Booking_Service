import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyRestaurant = () => {
  const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(
      `http://localhost:5000/resAdmin/myRestaurant/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="mt-10 ml-12">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{data.RestaurantName}</h2>
          <p>Owner Name: {data.OwnerName}</p>
          <p>City: {data.City}</p>
          <p>Email: {data.Email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyRestaurant;
