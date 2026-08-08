const { productAdd_srv, productUpdate_srv } = require('../services/product');
const { product_delete, product_select_sql,getProductTypes_drp_sql,
   product_select_extraDetails_sql, product_availaleStores_select_sql, 
   product_nonSerializedItemsSelect_sql, drp_stores_select_sql, getVariationTypes_drp_sql, 
   Product_Select_all_variations_sql, product_select_pos_menu_sql, getVariationProductDetails_sql, 
   get_ProductDetailsByInventoryId_sql, getSubProductListOfAssemblyProduct_sql, 
   Inventory_Get_LatestPricing_sql,
   ProductUom_Select_sql,batchUomDetailsByUomBarcode_Select_sql,
   product_SelectByBarcode_sql} = require('../sql/product');

exports.product_Add =async (req, res) => {
  const {
    tableId,
    storeIdList,
    productName,
    categoryIdList,
    variationProductList,
    measurementUnitId,

    productTypeId,
    isNotForSelling,
    imgUrl,
    isUnique,
    isMultiUom,
      multiUomTierList, // Included
    isStockTracked,
    isProductItem,
    isAssemblyProduct,
    isBatchTracked,
    brandId,

    reorderLevel,
    isExpiringProduct
  } = req.body;

console.log('body:',req.body);
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;

  try {
  const result=  await productAdd_srv(
    tenant,
    tableId,storeIdList,productName,categoryIdList, variationProductList,
    measurementUnitId, productTypeId,isNotForSelling,imgUrl,isUnique,isMultiUom,  multiUomTierList,
    isStockTracked,isProductItem,isAssemblyProduct,
    isBatchTracked,
    brandId,reorderLevel,isExpiringProduct,userLogId);


if(result.error){
    return res.status(422).json({
      error:result.error
    });
}

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

exports.product_Update =async (req, res) => {

  const { productId } = req.params;


  const {
    storeIdList,
    productName,
    categoryIdList,
    variationProductList,
    measurementUnitId,
    productTypeId,
    isNotForSelling,
    imgUrl,
    isUnique,
    isMultiUom,
      multiUomTierList, // Included
    isStockTracked,
    isProductItem,
    isAssemblyProduct,
    isBatchTracked,
    brandId,
    reorderLevel,
    isExpiringProduct
  } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';
  const tableId=productId;
  const saveType="U";
  const promptBeforeContinue=false;
  

  try {
  const result=  await productUpdate_srv(
    tenant,
    tableId,
    storeIdList,
    productName,
    categoryIdList,
    variationProductList,
    measurementUnitId,
    productTypeId,
    isNotForSelling,
    imgUrl,
    isUnique,
    isMultiUom,
      multiUomTierList, // Included
    isStockTracked,
    isProductItem,
    isAssemblyProduct,
    isBatchTracked,
    brandId,
    reorderLevel,
    isExpiringProduct,
    userLogId
    );


    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

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



exports.getProducts =async (req, res) => {
   console.log('products_Select',req.body);
  const {productId,productNo, productName,productDescription, barcode,sku,brandId,
    storeId,productTypeIds,isProductItem,
    isStockTracked,isExpiringProduct,isBatchTracked,uomType,
    categoryId,measurementUnitId,allSearchableFields,searchByKeyword,limit,skip } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await product_select_sql(tenant,productId,  productNo, productName,productDescription,
    sku,barcode,brandId,storeId,productTypeIds,isProductItem,
      isStockTracked,isExpiringProduct,isBatchTracked,uomType
    ,categoryId,measurementUnitId,
    allSearchableFields,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName);
   // console.log('products_Select result',result.results);
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


exports.getProductsPosMenu =async (req, res) => {
  const {productId,productNo, productName, barcode,sku,brandId,storeId,terminalId,productTypeIds,
    categoryId,measurementUnitId,allSearchableFields,searchByKeyword,limit,skip } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await product_select_pos_menu_sql(tenant,productId,  productNo, productName,
    sku,barcode,brandId,storeId,terminalId,productTypeIds,categoryId,measurementUnitId,
    allSearchableFields,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName);
      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });
}
};

exports.getVariationProductDetails_ctrl =async (req, res) => {
  const {productId,storeId } = req.body;
  const tenant=req.tenant;

  try {
  const result= await getVariationProductDetails_sql(tenant,productId,storeId);
      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });
}
};



exports.getProductsAllVariations =async (req, res) => {
  // console.log('products_Select',req.body);
  const {productId,productNo, productName, barcode,sku,brandId,storeId,productTypeIds,
    categoryId,measurementUnitId,allSearchableFields,searchByKeyword,limit,skip } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await Product_Select_all_variations_sql(tenant,productId,  productNo, productName,
    sku,barcode,brandId,storeId,productTypeIds,categoryId,measurementUnitId,
    allSearchableFields,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName);
   // console.log('products_Select result',result.results);
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


exports.product_delete =async (req, res) => {
  const { productId, isConfirm } = req.query;

  const _isConfirm = JSON.parse(isConfirm);

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';
  console.log('product_delete: ',_isConfirm)
  try {
  const result=  await product_delete(tenant,productId, userLogId,utcOffset,pageName,_isConfirm);
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

exports.getProductTypes_drp =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await getProductTypes_drp_sql(tenant, userLogId,utcOffset,pageName);

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


exports.getProductExtraDetails =async (req, res) => {

  const {productId} = req.query;
  const tenant=req.tenant;

  try {
  const result= await product_select_extraDetails_sql(tenant,productId);
   // console.log('products_Select result',result.results);
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

exports.getSubProductListOfAssemblyProduct_ctrl =async (req, res) => {

  const {allProductId} = req.query;
  console.log('allproductid',allProductId)
  const tenant=req.tenant;

  try {
  const result= await getSubProductListOfAssemblyProduct_sql(tenant,allProductId);
   // console.log('products_Select result',result.results);
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


exports.getProductAvailaleStores =async (req, res) => {

  const {productId,variationProductId} = req.body;
  const tenant=req.tenant;

  try {
  const result= await product_availaleStores_select_sql(tenant,productId,variationProductId);
    console.log('getProductAvailaleStores result',productId,result);
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


exports.getNonSerializedItems =async (req, res) => {

  const {productId,variationProductId} = req.body;
  const tenant=req.tenant;

  try {
  const result= await product_nonSerializedItemsSelect_sql(tenant,productId,variationProductId);
   // console.log('products_Select result',result.results);
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



exports.getStores_ctrl =async (req, res) => {

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await drp_stores_select_sql(tenant, userLogId,utcOffset,pageName);

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


exports.getVariationTypes_drp =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await getVariationTypes_drp_sql(tenant, userLogId,utcOffset,pageName);

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


exports.getProductDetailsByInventoryId =async (req, res) => {

  const {inventoryId} = req.query;
  const tenant=req.tenant;

  try {
  const result= await get_ProductDetailsByInventoryId_sql(tenant,inventoryId);
   // console.log('products_Select result',result.results);
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


exports.getInventoryLastPricing =async (req, res) => {

  const {inventoryId} = req.query;
  const tenant=req.tenant;

  try {
  const result= await Inventory_Get_LatestPricing_sql(tenant,inventoryId);
   // console.log('products_Select result',result.results);
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

exports.getProductUoms = async (req, res) => {
  const { allProductId,storeId, stockBatchId } = req.query;
  const tenant = req.tenant;

  try {
    // Validate required query parameters
    if (!allProductId) {
      return res.status(400).json({
        error: { message: "allProductId is required as a query parameter." }
      });
    }

    const result = await ProductUom_Select_sql(
      tenant,
      allProductId,
      storeId,
      stockBatchId
    );

    res.json(result);
  } catch (err) {
    console.error("Error fetching product UOMs: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack
      }
    });
  }
};


exports.getBatchUomDetailsByUomBarcode = async (req, res) => {
  const { barcode,storeId } = req.query;
  const tenant = req.tenant;

  try {
    // Validate required query parameters
    if (!barcode) {
      return res.status(400).json({
        error: { message: "barcode is required as a query parameter." }
      });
    }
    if (!storeIdId) {
      return res.status(400).json({
        error: { message: "storeIdId is required as a query parameter." }
      });
    }

    const result = await batchUomDetailsByUomBarcode_Select_sql(
      tenant,
      barcode,
      storeId
    );

    res.json(result);
  } catch (err) {
    console.error("Error fetching product UOMs: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack
      }
    });
  }
};




exports.getProductsByBarcode =async (req, res) => {
  const {storeId,barcode,uomType} = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await product_SelectByBarcode_sql(tenant,storeId,barcode,uomType);
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
