const { category_select_sql, category_register_menu_select_sql, category_dropdown_select_sql, category_insert_update_sql, category_delete_sql } = require("../sql/category");

exports.getProductCategories =async (req, res) => {

  const {categoryId,limit,skip } = req.body;
  const tenant=req.tenant;
  const userLogId=1;
console.log('req.body',req.body)
  try {
  const result= await category_select_sql(tenant,categoryId,skip,limit, userLogId);

      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};

exports.addCategory = async (req, res) => {
  const {categoryName} =req.body;
  console.log('addCategory')
  const tenant = req.tenant;
  const userLogId = 1;
  const saveType = "I";

  try {

    if (!categoryName) {
      return res.status(422).json({
        error: {message:"categoryName is Required"},
      });
    }

    const result = await category_insert_update_sql(
      tenant,
      null,
      categoryName,
      saveType,
      userLogId,
    );
    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

    res.status(201).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.updateCategory = async (req, res) => {
  const {categoryName} =req.body;

  const {categoryId}=req.params;
  console.log('updateCategory',categoryId)
  const tenant = req.tenant;
  const userLogId = 1;
  const saveType = "U";


  try {

    if (!categoryId) {
      return res.status(422).json({
        error: {message:"categoryId is Required"},
      });
    }

    if (!categoryName) {
      return res.status(422).json({
        error: {message:"categoryName is Required"},
      });
    }

    const result = await category_insert_update_sql(
      tenant,
      categoryId,
      categoryName,
      saveType,
      userLogId,
    );
    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

    res.status(201).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  const tenant = req.tenant;
  const userLogId = 1;

  try {
    const result = await category_delete_sql(
      tenant,
      categoryId,
      userLogId
    );

    res.json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};



exports.getRegistermMenuProductCategory =async (req, res) => {

  const {productId,productNo, productName, barcode,productCategoryId,searchByKeyword,limit,skip } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await category_register_menu_select_sql(tenant,productId,  productNo, productName,barcode,productCategoryId,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName);

      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};

exports.getCategory_dropdown =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await category_dropdown_select_sql(tenant, userLogId,utcOffset,pageName);

      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};
