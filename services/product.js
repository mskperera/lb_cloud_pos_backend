const { product_insertUpdate_sql } = require("../sql/product");



exports.productAdd_srv =async ( 
  tenant,
  tableId,storeIdList, productNo,isProductNoAutoGenerate,productName,categoryIdList, variationProductList,
  comboProductDetailList,measurementUnitId, productTypeId,isNotForSelling,imgUrl,isUnique,isStockTracked,isProductItem,
  brandId,unitCost,unitPrice,taxPerc,sku,barcode,reorderLevel,isExpiringProduct) => {

  if (!productNo) {
    return {
      error: {message:"productNo is Required"},
    }
  }

  if (!productName) {
    return {
      error: {message:"productName is Required"},
    }
  }

  if (!categoryIdList) {
    return {
      error: {message:"categoryIdList is Required"},
    };
  }

  if (!measurementUnitId) {
    return {
      error: {message:"measurementUnitId is Required"},
    };
  }

  if (!productTypeId) {
    return {
      error: {message:"productTypeId is Required"},
    };
  }

  if (isNotForSelling===null || isNotForSelling==="") {
    return {
      error: {message:"isNotForSelling is Required"},
    };
  }


  if (isUnique===null || isUnique==="") {
    return {
      error: {message:"isUnique or not is Required"},
    };
  }

  if (isStockTracked===null || isStockTracked==="") {
    return {
      error: {message:"isStockTracked or not is Required"},
    };
  }

  if (!brandId) {
    return {
      error: {message:"brandId is Required"},
    };
  }

  if (isExpiringProduct===null || isExpiringProduct==="") {
    return {
      error: { message: "isExpiringProduct is Required" },
    };
  }


if(productTypeId!==2){
  if (!unitCost) {
    return {
      error: {message:"unitCost is Required"},
    };
  }

  if (!unitPrice) {
    return {
      error: {message:"unitPrice is Required"},
    };
  }

  if (!taxPerc) {
    return {
      error: {message:"taxPerc is Required"},
    };
  }
}


  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';
  const promptBeforeContinue=false;
  //const tableId=productId;
  const saveType="I";

  try {
  const result=  await product_insertUpdate_sql(
    tenant,
      tableId,
      storeIdList,
      productNo,
      isProductNoAutoGenerate,
      productName,
      categoryIdList,
      variationProductList,
      comboProductDetailList,
      measurementUnitId,
      productTypeId,
      isNotForSelling,
      imgUrl,
      isUnique,
    isStockTracked,
    isProductItem,
      brandId,
      unitCost,unitPrice,taxPerc,
      sku,
      barcode,
      reorderLevel,
      isExpiringProduct,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      promptBeforeContinue);

return result;
 

} catch (error) {
  console.log("productAdd_srv()-> error :", error);
  throw error;
}
};

exports.productUpdate_srv = async (
  tenant,
  tableId,
  storeIdList,
  productNo,
  isProductNoAutoGenerate,
  productName,
  categoryIdList,
  variationProductList,
  comboProductDetailList,
  measurementUnitId,
  productTypeId,
  isNotForSelling,
  imgUrl,
  isUnique,
  isStockTracked,
  isProductItem,
  brandId,
  unitCost,unitPrice,taxPerc,
  sku,
  barcode,
  reorderLevel,
  isExpiringProduct
) => {
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const saveType = "U";
  const promptBeforeContinue = false;

  // if (!productNo) {
  //   return res.status(422).json({
  //     error: {message:"productNo is Required"},
  //   });
  // }

  if (!productName) {
    return {
      error: { message: "productName is Required" },
    };
  }

  if (!categoryIdList) {
    return {
      error: { message: "categoryIdList is Required" },
    };
  }

  if (!measurementUnitId) {
    return {
      error: { message: "measurementUnitId is Required" },
    };
  }

  if (!productTypeId) {
    return {
      error: { message: "productTypeId is Required" },
    };
  }

  if (isNotForSelling === null || isNotForSelling === "") {
    return {
      error: { message: "isNotForSelling is Required" },
    };
  }

  if (isUnique === null || isUnique === "") {
    return {
      error: { message: "isUnique or not is Required" },
    };
  }

  if (isStockTracked === null || isStockTracked === "") {
    return {
      error: { message: "isStockTracked or not is Required" },
    };
  }

  if (!brandId) {
    return {
      error: { message: "brandId is Required" },
    };
  }

  
  if (isExpiringProduct === null || isExpiringProduct === "") {
    return {
      error: { message: "isExpiringProduct is Required.." },
    };
  }
  

  // if (costPrice === null || costPrice === "") {
  //   return {
  //     error: { message: "costPrice is Required" },
  //   };
  // }

  if(productTypeId!==2){
    if (!unitCost) {
      return {
        error: {message:"unitCost is Required"},
      };
    }

    if (!unitPrice) {
      return {
        error: {message:"unitPrice is Required"},
      };
    }

    if (!taxPerc) {
      return {
        error: {message:"taxPerc is Required"},
      };
    }

  }

  try {
    const result = await product_insertUpdate_sql(
      tenant,
      tableId,
      storeIdList,
      productNo,
      isProductNoAutoGenerate,
      productName,
      categoryIdList,
      variationProductList,
      comboProductDetailList,
      measurementUnitId,
      productTypeId,
      isNotForSelling,
      imgUrl,
      isUnique,
      isStockTracked,
      isProductItem,
      brandId,
      unitCost,unitPrice,taxPerc,
      sku,
      barcode,
      reorderLevel,
      isExpiringProduct,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      promptBeforeContinue
    );

    return result;
    
  } catch (error) {
    console.log("productUpdate_srv()-> error :", error);
    throw error;
  }
};