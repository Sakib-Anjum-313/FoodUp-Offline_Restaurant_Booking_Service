// internal export
const NewRestaurant = require("../models/NewRestaurant");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const TableInfo = require("../models/TableInfo");

/************************
   My Restaurant Info 
*************************/
async function myRestaurant(req, res, next) {
  const resEmail = req.params.email;
  // console.log(resEmail);
  const query = { Email: resEmail };
  try {
    const result = await NewRestaurant.findOne(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

/************************
  Edit Table Info 
*************************/

async function editTableInfo(req, res, next) {
  const resEmail = req.params.email;
  const resTableList = req.body;
  const filter = { ResEmail: resEmail };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      Tables: resTableList,
    },
  };
  try {
    const result = await TableInfo.findOneAndUpdate(filter, updateDoc, options);
    res.status(200).json({ acknowledged: true });
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

/************************
   GET All Table Info 
*************************/

async function allTableInfo(req, res, next) {
  const resEmail = req.params.email;
  const query = { ResEmail: resEmail };
  try {
    const result = await TableInfo.findOne(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

/************************
   Update Table Status 
*************************/

async function updateTableStatus(req, res, next) {
  console.log(req.body);
  const resEmail = req.params.email;
  const resTableList = req.body;
  const filter = { ResEmail: resEmail };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      Tables: resTableList,
    },
  };
  try {
    const result = await TableInfo.updateOne(filter, updateDoc, options);
    await res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

/************************
   Post New Category
*************************/
async function addAProductCategory(req, res, next) {
  console.log(req.body);

  const singleCategory = req.body;

  try {
    const productCategory = new ProductCategory(singleCategory);
     productCategory.save().then((data) => {
       console.log(data);
       res.status(200).json(data);
     });
    
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
};

async function addANewProduct(req, res, next) {
  console.log(req.body);
  const foodDetails = req.body;
  try {
    const product = new Product(foodDetails);
    product.save().then((data) => {
      console.log(data);
      res.status(200).json({acknowledged: true, data});
    });
    
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
  
}

async function getAllCategories(req, res, next) {
  console.log(req.params.ResEmail);
  const resEmail = req.params.ResEmail;
  const filter = { ResEmail: resEmail };
  try {
    const result = await ProductCategory.find(filter);
    await res.status(200).json(result);
  } catch (error) {
   res.status(500).json({
     errors: `${error}`,
   });
  }
};


async function getAllProducts(req, res, next) {
  const resEmail = req.params.ResEmail;
  const filter = { ResEmail: resEmail };

  try {
    const result = await Product.find(filter);
    await res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}






module.exports = {
  myRestaurant,
  editTableInfo,
  allTableInfo,
  updateTableStatus,
  addAProductCategory,
  getAllCategories,
  addANewProduct,
  getAllProducts,
};
