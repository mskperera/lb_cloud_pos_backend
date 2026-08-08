const { product_insertUpdate_sql } = require("../sql/product");



exports.productAdd_srv =async ( 
  tenant,
  tableId,storeIdList,productName,categoryIdList, variationProductList,
  measurementUnitId, productTypeId,isNotForSelling,imgUrl,isUnique,
  isMultiUom,
        multiUomTierList, // Included
  isStockTracked,isProductItem,isAssemblyProduct,isBatchTracked,
  brandId,reorderLevel,isExpiringProduct,userLogId) => {
   
    if (!userLogId) {
      return {
        error: { message: "userLogId is Required" },
      };
    }

   

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

   if (isMultiUom === null || isMultiUom === "") {
      return {
        error: { message: "isMultiUom or not is Required" },
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
        error: { message: "isExpiringProduct is Required" },
      };
    }
    
  

    const utcOffset = "5:30";
    const pageName = "p";
    const promptBeforeContinue = false;
    //const tableId=productId;
    const saveType = "I";

    try {
      const result = await product_insertUpdate_sql(
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
        saveType,
        userLogId,
        utcOffset,
        pageName,
        promptBeforeContinue
      );

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
) => {
  const utcOffset = "5:30";
  const pageName = "p";
  const saveType = "U";
  const promptBeforeContinue = false;

  // if (!productNo) {
  //   return res.status(422).json({
  //     error: {message:"productNo is Required"},
  //   });
  // }
  
  if (!userLogId) {
    return {
      error: { message: "userLogId is Required" },
    };
  }

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


    if (isMultiUom === null || isMultiUom === "") {
    return {
      error: { message: "isMultiUom or not is Required" },
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


  try {
    const result = await product_insertUpdate_sql(
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