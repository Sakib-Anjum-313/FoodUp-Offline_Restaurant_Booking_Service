import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthProvider";
import AddCategoryModal from "./AddCategoryModal";
import AddFoodModal from "./AddFoodModal";

const MenuEdit = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useContext(AuthContext);
  const [uploaded, setUploaded] = useState(false);
  const [displayCategory, setDisplayCategory] = useState([]);
  const navigate = useNavigate();

  //fetching category to db

  useEffect(() => {
    fetch(
      `http://localhost:5000/restaurantAdmin/menuEdit/category/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCategoryList(data.FoodCategories);
      });
  }, [user.email, setCategoryList]);

  // add new category to state
  const handleAddCategory = (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.categoryName.value;

    let newCategory = {
      CategoryName: categoryName,
      FoodList: [],
    };
    let newCategoryList = [...categoryList, newCategory];
    setCategoryList(newCategoryList);
    // console.log(newCategoryList);
    form.reset();
  };

  // add food to state
  const handleAddFoodItem = (event) => {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value;
    const foodImg = form.foodImg.value;
    const foodPrice = form.foodPrice.value;
    const foodQuantity = form.foodQuantity.value;
    const whichCategory = form.whichCategory.value;

    let foodDetails = {
      FoodName: foodName,
      FoodImg: foodImg,
      FoodPrice: foodPrice,
      FoodQuantity: foodQuantity,
      WhichCategory: whichCategory,
      Availability: "Available",
    };

    let newCategoryList = [];

    categoryList.forEach((category) => {
      if (category.CategoryName === whichCategory) {
        category.FoodList.push(foodDetails);
        newCategoryList.push(category);
      } else {
        newCategoryList.push(category);
      }
      setCategoryList(newCategoryList);
    });

    // console.log(categoryList);
    form.reset();
    setUploaded(true);
  };

  //handleSaveToDatabase

  const handleSaveToDatabase = () => {
    fetch(
      `http://localhost:5000/restaurantAdmin/menuEdit/${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(categoryList),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUploaded(!uploaded);
        if (data.acknowledged) {
          Swal.fire({
            title: "Wow",
            text: "Menu Info Updated Successfully",
            icon: "success",
          });
          console.log(data);
        } else {
          Swal.fire({
            title: "Sorry!!!",
            text: "Error Occurs!!! Try again",
            icon: "error",
          });
        }
      });
  };

  // handleCategoryDisplay

  const handleCategoryDisplay = (CategoryName) => {
    let selectedCategory = categoryList?.find(
      (category) => category.CategoryName === CategoryName
    );
    console.log(selectedCategory);
    setDisplayCategory(selectedCategory);
    navigate(`/restaurantAdmin/menuEdit/${CategoryName}`);
  };

  // handle change product

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
    if(Food.FoodName === foodItem.FoodName &&
      Food.FoodPrice === foodItem.FoodPrice) {
      category.FoodList.splice(desireFoodIndex, 1, foodItem);

      categoryList.forEach((singleCategory, index) => {
        if (singleCategory.CategoryName === category.CategoryName) {
          let newCategoryList = [...categoryList];
          newCategoryList.splice(index, 1, category);
          setCategoryList(newCategoryList);
          setUploaded(true);
          form.reset();
        }
      })
         }
  });

  };

  // delete a food card  categoryList
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
          <label htmlFor="add-category-modal" className="btn btn btn-success">
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
        <div>
          <span className="font-semibold mr-1 ml-5">Step 3:</span>
          <button
            disabled={!uploaded}
            onClick={handleSaveToDatabase}
            className="btn btn-secondary ml-1"
          >
            Save To Database
          </button>
        </div>
      </div>
      <div className="ml-14 mt-6">
        <p>
          <span className="font-bold">Note:</span> If you want to{" "}
          <span className="font-bold ml-1">add food</span> into
          <span className="font-bold ml-1">same category</span> then just follow
          <span className="font-bold"> Step: 2 & Step: 3</span> only.
        </p>
      </div>

      {/* category buttons */}

      <div className="mt-12 ml-14">
        {/* <Link to={`/restaurantAdmin/menuEdit/`}>
          <button className="btn btn-secondary btn-sm">All</button>
        </Link> */}
        {categoryList?.map((category, index1) => (
          <button
            key={index1}
            onClick={() => {
              handleCategoryDisplay(category.CategoryName);
            }}
            className="btn btn-primary btn-sm ml-4"
          >
            {category.CategoryName}
          </button>
        ))}
      </div>

      {/* displaying category  here */}
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
