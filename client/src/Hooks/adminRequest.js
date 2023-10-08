// Super Admin

/************************
   RESTAURANT ADMIN 
*************************/

/************************
   GET Methods
*************************/

// GET all Table Info
async function httpGetAllTables(userEmail) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/allTableInfo/${userEmail}`
  );
  return await response.json();
}

// Get All Product Category
async function httpGetCategory(userEmail) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/editMenu/getAllCategories/${userEmail}`
  );
  return await response.json();
};

// Get All Product

async function httpGetAllProduct(userEmail) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/editMenu/getAllProducts/${userEmail}`
  );

  return await response.json();
}

/************************
   POST Methods 
*************************/

// Post single product category

async function httpUploadCategory(singleCategory) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/editMenu/uploadProductCategory`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(singleCategory),
    }
  );

  return await response.json();
}

// POST A Product

async function httpAddAProduct(productDetails) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/editMenu/addANewProduct`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productDetails),
    }
  );

  return await response.json();
}

/************************
   PUT methods 
*************************/

async function httpUpdateTableStatus(userEmail, tableInformation) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/liveTableTracking/updateTableStatus/${userEmail}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tableInformation),
    }
  );
  return await response.json();
}

async function httpEditTableInfo(userEmail, tableList) {
  const response = await fetch(
    `http://localhost:5000/resAdmin/editTableInfo/${userEmail}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tableList),
    }
  );
  return await response.json();
}

export {
  httpAddAProduct,
  httpEditTableInfo, httpGetAllProduct, httpGetAllTables,
  httpGetCategory,
  httpUpdateTableStatus,
  httpUploadCategory
};

