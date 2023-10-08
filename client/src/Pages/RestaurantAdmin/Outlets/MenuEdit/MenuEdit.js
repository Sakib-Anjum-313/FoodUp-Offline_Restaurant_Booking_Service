import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthProvider";
import { httpAddAProduct, httpGetAllProduct, httpGetCategory, httpUploadCategory } from "../../../../Hooks/adminRequest";
import AddCategoryModal from "./AddCategoryModal";
import AddFoodModal from "./AddFoodModal";

const MenuEdit = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const { user } = useContext(AuthContext);
  const [uploaded, setUploaded] = useState(false);
  const [displayCategory, setDisplayCategory] = useState([]);
  const navigate = useNavigate();

  /**************************
    Fetching Category from DB 
  ***************************/

  useEffect(() => {
    httpGetAllProduct(user?.email).then((data) => {
      console.log(data);
      setFoodList(data);
    });

    httpGetCategory(user?.email).then((data) => {
      // console.log(data);
      setCategoryList(data);
    });
  }, [user.email]);

  //////////////////  Add New Category to State & Upload to DB    //////////////

  const handleAddCategory = (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.categoryName.value;

    let newCategory = {
      ResEmail: `${user?.email}`,
      CategoryName: categoryName,
    };

    httpUploadCategory(newCategory)
      .then((data) => {
        if (!data.errors) {
          console.log(data);
          let newCategoryItem = data;
          newCategoryItem.View = 'Inactive';
          let newCategoryList = [...categoryList, newCategoryItem];
          console.log(newCategoryList);
          setCategoryList(newCategoryList);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    form.reset();
  };

  ///////////////////////   Handle New Food Display  ////////////////////////

  const handleNewFoodDisplay = (foodItem) => {
    let prevSelectedCategoryFoods = foodList?.filter(
      (food) => food.WhichCategory === foodItem.WhichCategory
    );
    const updatedSelectedCategoryFoods = [
      ...prevSelectedCategoryFoods,
      foodItem,
    ];
    setDisplayCategory(updatedSelectedCategoryFoods);
    navigate(`/restaurantAdmin/menuEdit/${foodItem.WhichCategory}`);
  };

  /////////////////////////   Handle Food Display  ////////////////////////

  const handleCategoryDisplay = (CategoryName) => {
    let selectedCategoryFoods = foodList?.filter(
      (food) => food.WhichCategory === CategoryName
    );
    console.log(selectedCategoryFoods);
    setDisplayCategory(selectedCategoryFoods);

    let newCategoryList = [...categoryList];
    
    newCategoryList.forEach((category) => {
      if (category.CategoryName === CategoryName) {
        category.View = "Active";
      } else {
        category.View = "Inactive";
      }
    });
    setCategoryList([...newCategoryList]);
    navigate(`/restaurantAdmin/menuEdit/${CategoryName}`);
  };

  /////////////////////////   Add A Food to State  /////////////////////////////

  const handleAddFoodItem = (event) => {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value;
    const foodImg = form.foodImg.value;
    const foodPrice = form.foodPrice.value;
    const foodQuantity = form.foodQuantity.value;
    const whichCategory = form.whichCategory.value;

    let aNewFood = {
      ResEmail: `${user?.email}`,
      FoodName: foodName,
      FoodImg: foodImg,
      FoodPrice: foodPrice,
      FoodQuantity: foodQuantity,
      WhichCategory: whichCategory,
      Availability: "Available",
    };

    httpAddAProduct(aNewFood).then((data) => {
      // console.log(data);
      if (data.acknowledged) {
        const newFoodItem = data.data;
        let newFoodList = [...foodList, newFoodItem];
        setFoodList(newFoodList);
        handleNewFoodDisplay(newFoodItem);
        //  console.log(displayCategory);
      } else {
        Swal.fire({
          title: "Sorry!!!",
          text: "Error occurs in server end!!! Try again",
          icon: "error",
        });
      }
    });
    form.reset();
    setUploaded(true);
  };


  /*************************** 
      Update Product Info
   ***************************/

  //event, foodItem, category

  const handleChangeProductInfo = (event, foodItem, category) => {
    event.preventDefault();
    const form = event.target;
    const productNewPrice = form.productPrice.value;
    const productNewQuantity = form.productQuantity.value;
    const productCurrentAvailability = form.productAvailability.value;

    foodItem.FoodPrice = productNewPrice;
    foodItem.FoodQuantity = productNewQuantity;
    foodItem.Availability = productCurrentAvailability;

    category.FoodList.forEach((Food, desireFoodIndex) => {
      if (
        Food.FoodName === foodItem.FoodName &&
        Food.FoodPrice === foodItem.FoodPrice
      ) {
        category.FoodList.splice(desireFoodIndex, 1, foodItem);

        categoryList.forEach((singleCategory, index) => {
          if (singleCategory.CategoryName === category.CategoryName) {
            let newCategoryList = [...categoryList];
            newCategoryList.splice(index, 1, category);
            setCategoryList(newCategoryList);
            setUploaded(true);
            form.reset();
          }
        });
      }
    });
  };

  ///////////////////////   Delete a food card  categoryList  ////////////////////////

  const handleDeleteItem = (foodItem, currentDisplayCategory) => {
    console.log(foodItem);
    console.log(currentDisplayCategory);

    currentDisplayCategory.FoodList.forEach((category, index) => {
      if (
        category.FoodName === foodItem.FoodName &&
        category.FoodPrice === foodItem.FoodPrice
      ) {
        currentDisplayCategory.FoodList.splice(index, 1);
        console.log(currentDisplayCategory);
        let newCategoryList = [...categoryList];

        newCategoryList.forEach((foodCategory, index2) => {
          if (
            foodCategory.CategoryName === currentDisplayCategory.CategoryName
          ) {
            newCategoryList.splice(index2, 1, currentDisplayCategory);
            setCategoryList(newCategoryList);
            const newDisplayCategory = currentDisplayCategory;
            setDisplayCategory(newDisplayCategory);
            setUploaded(true);
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="mt-10 ml-14 flex">
        <div>
          <span className="font-semibold mr-1">Step 1:</span>
          <label htmlFor="add-category-modal" className="btn btn bg-teal-300">
            + Add A New Category
          </label>
        </div>
        <AddCategoryModal
          handleAddCategory={handleAddCategory}
        ></AddCategoryModal>

        <div>
          <span className="font-semibold mr-1 ml-5">Step 2:</span>
          <label htmlFor="add-food-modal" className="btn btn-warning ml-1">
            + Add A Food
          </label>
        </div>
        <AddFoodModal
          handleAddFoodItem={handleAddFoodItem}
          categoryList={categoryList}
        ></AddFoodModal>
      </div>
      <div className="ml-14 mt-6">
        <p>
          <span className="font-bold">Note:</span> If you want to{" "}
          <span className="font-bold ml-1">Add A Food</span> into
          <span className="font-bold ml-1">Same Category</span> then just follow
          <span className="font-bold"> Step: 2</span> only.
        </p>
      </div>

      {/* *******************
         Display category buttons 
      **********************/}

      <div className="mt-12 ml-14 flex">
        {/* <Link to={`/restaurantAdmin/menuEdit/`}>
          <button className="btn btn-secondary btn-sm">All</button>
        </Link> */}
        {categoryList?.map((category, index1) => (
          <>
            <button
              key={index1}
              onClick={() => {
                handleCategoryDisplay(category.CategoryName);
              }}
              className={` btn-sm ml-4 ${
                category.View === "Active"
                  ? "btn btn-warning"
                  : "btn bg-lime-300"
              }`}
            >
              {category.CategoryName}
            </button>
            <button className="btn btn-sm btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        ))}
      </div>

      {/* displaying Food Items  here */}
      <div>
        <Outlet
          context={[displayCategory, handleChangeProductInfo, handleDeleteItem]}
        ></Outlet>
        {/* <CategoryCard displayCategory={displayCategory}></CategoryCard> */}
      </div>
    </div>
  );
};

export default MenuEdit;
