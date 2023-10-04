import React from "react";

const AddFoodModal = ({ handleAddFoodItem, categoryList }) => {
  // console.log(categoryList);
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <form
        onSubmit={(event) => {
          handleAddFoodItem(event);
        }}
      >
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="add-food-modal" className="modal-toggle" />
        <label htmlFor="add-food-modal" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Please Add A Food Item!</h3>
            <div className="flex flex-col ml-3">
              <label className="mt-3 font-semibold">Which Category:</label>
              <select 
                name="whichCategory"
                className="select select-bordered w-full max-w-xs"
              >
                {categoryList?.map((category, index2) => (
                  <option key={index2} value={`${category.CategoryName}`}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="whichCategory"
                placeholder="Select Category"
                className="input input-bordered w-full  max-w-xs"
              /> */}
              <label className="mt-3 font-semibold">Food Name:</label>
              <input
                type="text"
                name="foodName"
                placeholder="food Name"
                className="input input-bordered w-full  max-w-xs"
                required
              />
              <label className="mt-3 font-semibold">Image URL:</label>
              <input
                type="text"
                name="foodImg"
                placeholder="Food Image URL"
                className="input input-bordered w-full  max-w-xs"
                required
              />
              <label className="mt-3 font-semibold">Price:</label>
              <input
                type="number"
                name="foodPrice"
                placeholder="Food Price"
                className="input input-bordered w-full  max-w-xs"
                required
              />
              <label className="mt-3 font-semibold">Quantity:</label>
              <input
                type="number"
                name="foodQuantity"
                placeholder="Food Quantity"
                className="input input-bordered w-full  max-w-xs"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit">
                <label htmlFor="add-food-modal" className="btn">
                  Okey
                </label>
              </button>
            </div>
          </label>
        </label>
      </form>
    </div>
  );
};

export default AddFoodModal;
