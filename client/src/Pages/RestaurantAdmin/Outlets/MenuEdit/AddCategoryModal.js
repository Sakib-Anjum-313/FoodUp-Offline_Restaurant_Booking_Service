import React from "react";

const AddCategoryModal = ({ handleAddCategory }) => {
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <form
        onSubmit={(event) => {
          handleAddCategory(event);
        }}
      >
        <input
          type="checkbox"
          id="add-category-modal"
          className="modal-toggle"
        />
        <label htmlFor="add-category-modal" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Please Add A Food Item!</h3>
            <div className="flex flex-col ml-3">
              <label className="mt-3 font-semibold">Category Name:</label>
              <input
                type="text"
                name="categoryName"
                placeholder="Type Here"
                className="input input-bordered w-full mt-1 max-w-xs"
              />
            </div>
            <div className="modal-action">
              <button type="submit">
                <label htmlFor="add-category-modal" className="btn">
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

export default AddCategoryModal;
