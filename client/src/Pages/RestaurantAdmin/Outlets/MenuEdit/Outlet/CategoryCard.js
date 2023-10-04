import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const CategoryCard = () => {
  // const { user } = useContext(AuthContext);
  const [displayCategory, handleChangeProductInfo, handleDeleteItem] =
    useOutletContext();
  const [categoryData, setCategoryData] = useState([]);

  // const [inputFields, setInputFields] = useState([
  //   {
  //     productPrice: "",
  //     productQuantity: "",
  //     productAvailability:''
  //   },
  // ]);

  useEffect(() => {
    setCategoryData(displayCategory);
  }, [displayCategory]);

  console.log(displayCategory);

  const handleChange = (event) => {
    let data = [];

    data[event.target.name] = event.target.value;

    // console.log(data);
  };

  //handleChangeProductInfo(event, foodItem, displayCategory);

 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mt-8 ml-14 gap-4 shadow-xl p-4 bg-slate-100 mr-14  justify-center rounded-xl">
      {categoryData?.FoodList?.map((foodItem, indx) => (
        <div key={indx} className="">
          <div className="card w-fit bg-base-100 shadow-xl">
            <figure>
              <img src={foodItem?.FoodImg} alt="Shoes" />
            </figure>
            <div className="card-body">
              <form
                id = {foodItem.FoodName}
                onSubmit={(event) => {
                  handleChangeProductInfo(event, foodItem, displayCategory);
                }}
              >
                <h2 className="card-title">{foodItem.FoodName}</h2>
                <p className="flex items-center">
                  <span>Price:</span>
                  <span className="font-semibold ml-1">
                    {" "}
                    {foodItem.FoodPrice}
                  </span>
                  <input
                    name="productPrice"
                    type="number"
                    placeholder="New Price..."
                    className="input input-bordered input-sm  w-28 max-w-xs ml-2 mr-1"
                    required
                    // defaultValue={foodItem.FoodPrice}
                  />
                  BDT
                  {/* <span className="font-semibold">{foodItem.FoodPrice}</span> */}
                </p>
                <p className="flex items-center mt-1">
                  <span>Quantity:</span>
                  <span className="font-semibold ml-1">
                    {foodItem.FoodQuantity}
                  </span>
                  <input
                    name="productQuantity"
                    type="number"
                    placeholder="New Qtn..."
                    className="input input-bordered input-sm  w-28 max-w-xs ml-2"
                    required
                    // defaultValue={foodItem.FoodQuantity}
                    // value={foodItem.FoodQuantity}
                  />
                  {/* <span className="font-semibold">{foodItem.FoodQuantity}</span> */}
                </p>
                <p className="flex items-center mt-1">
                  <span>Category:</span>
                  <span className="font-semibold ml-1">
                    {foodItem.WhichCategory}
                  </span>
                </p>
                <p className="flex items-center mt-1">
                  <span>Availability:</span>
                  <span className="font-semibold ml-1">
                    {foodItem.Availability}
                  </span>
                </p>

                <div className="card-actions justify-end mt-1">
                  <select
                    name="productAvailability"
                    className="select select-bordered w-full max-w-xs"
                    required
                    // defaultValue={foodItem.Availability}
                    // value={foodItem.Availability}
                  >
                    <option value={"Available"}>Available</option>
                    <option value={"Disable"}>Disable</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn w-full btn-sm btn-outline btn-success mt-1"
                >
                  Save Changes
                </button>
              </form>

              <button
                onClick={() => {
                  handleDeleteItem(foodItem, displayCategory);
                }}
                className="btn btn-sm btn-outline btn-error "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default (CategoryCard);
