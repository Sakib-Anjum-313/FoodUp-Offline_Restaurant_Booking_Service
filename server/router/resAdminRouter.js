// external imports
const express = require("express");

// internal import
const router = express.Router();
const {
  myRestaurant,
  editTableInfo,
  allTableInfo,
  updateTableStatus,
  addAProductCategory,
  getAllCategories,
  addANewProduct,
  getAllProducts,
} = require("../controller/resAdminController");



// Res Admin Router

/************************
   GET Methods 
*************************/
router.get("/myRestaurant/:email", myRestaurant);
router.get("/allTableInfo/:email", allTableInfo);
router.get("/editMenu/getAllCategories/:ResEmail", getAllCategories);
router.get("/editMenu/getAllProducts/:ResEmail", getAllProducts);


/************************
   POST Methods 
*************************/
router.post("/editMenu/uploadProductCategory", addAProductCategory);
router.post("/editMenu/addANewProduct", addANewProduct);


/************************
   PUT Methods
*************************/
router.put("/editTableInfo/:email", editTableInfo);
router.put("/liveTableTracking/updateTableStatus/:email", updateTableStatus);


/************************
   Delete Methods 
*************************/

module.exports = router;
