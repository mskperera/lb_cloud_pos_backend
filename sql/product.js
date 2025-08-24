const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");


exports.product_insertUpdate_sql = async (
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
  unitCost,
      unitPrice,
      taxPerc,
  sku,
  barcode,
  reorderLevel,
  isExpiringProduct,
  saveType,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {

    const categoryIdList_json=JSON.stringify(categoryIdList);
    const variationProductList_json=JSON.stringify(variationProductList);
    const comboProductDetailList_json=JSON.stringify(comboProductDetailList);
    const storeIdList_json=JSON.stringify(storeIdList);
console.log('saveType',saveType);
    
    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      storeIdList_json,
      productNo,
      isProductNoAutoGenerate,
      productName,
      categoryIdList_json,
      variationProductList_json,
      comboProductDetailList_json,
      measurementUnitId,
      productTypeId,
      isNotForSelling,
      imgUrl,
      isUnique,
      isStockTracked,
      isProductItem,
      brandId,
       unitCost,
      unitPrice,
      taxPerc,
      sku,
      barcode,
      reorderLevel,
      isExpiringProduct,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    ];
    const procedureOutputParameters = ["responseStatus","outputMessage","productId"];
    const procedureName = "Product_Insert_Update";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    console.log('outputValues:', result);
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.product_delete = async (
  tenant,
  productId,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      productId,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "Product_Delete";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.get_DC_ProductIdByProductId = async (tenant,productId) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [productId];
    const procedureOutputParameters = ["dc_ProductId"];
    const procedureName = "get_DC_ProductIdByProductId";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { dc_ProductId } = result.outputValues;
    return dc_ProductId;
  } catch (error) {
    throw error;
  }
};

exports.product_select_pos_menu_sql = async (
  tenant,
  productId,
  productNo,
  productName,
  sku,
  barcode,
  brandId,
  storeId,
  productTypeIds,
  productCategoryId,
  measurementUnitId,
  allSearchableFields=null,
  searchByKeyword,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName,
  promptBeforeContinue
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      productNo,
      productName,
      sku,
      barcode,
      productCategoryId,
      brandId,
      storeId,
      productTypeIds ? JSON.stringify(productTypeIds):null, // Convert array to JSON string
      measurementUnitId,
      allSearchableFields,
      searchByKeyword,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "Product_Select_pos_menu";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getVariationProductDetails_sql = async (
  tenant,
  productId,
  storeId,
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      storeId
    ];
    const procedureOutputParameters = [
    ];
    const procedureName = "getVariationProductDetails";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    return result;
  } catch (error) {
    throw error;
  }
};


exports.product_select_sql = async (
  tenant,
  productId,
  productNo,
  productName,
  productDescription,
  sku,
  barcode,
  brandId,
  storeId,
  productTypeIds,
  isProductItem=false,
  productCategoryId,
  measurementUnitId,
  allSearchableFields=null,
  searchByKeyword,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName,
  promptBeforeContinue
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      productNo,
      productName,
      productDescription,
      sku,
      barcode,
      productCategoryId,
      brandId,
      storeId,
      productTypeIds ? JSON.stringify(productTypeIds):null, // Convert array to JSON string
      isProductItem,
      measurementUnitId,
      allSearchableFields,
      searchByKeyword,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "Product_Select";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};


exports.Product_Select_all_variations_sql = async (
  tenant,
  productId,
  productNo,
  productName,
  sku,
  barcode,
  brandId,
  storeId,
  productTypeIds,
  productCategoryId,
  measurementUnitId,
  allSearchableFields=null,
  searchByKeyword,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName,
  promptBeforeContinue
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      productNo,
      productName,
      sku,
      barcode,
      productCategoryId,
      brandId,
      storeId,
      productTypeIds ? JSON.stringify(productTypeIds):null, // Convert array to JSON string
      measurementUnitId,
      allSearchableFields,
      searchByKeyword,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "Product_Select_all_variations";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};



exports.product_select_extraDetails_sql = async (
  tenant,
  productId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "productTypeId",
    ];
    const procedureName = "Product_Select_extraDetails";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};


exports.product_availaleStores_select_sql = async (
  tenant,
  productId,
  variationProductId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      variationProductId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "product_availaleStores_select";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.product_nonSerializedItemsSelect_sql = async (
  tenant,
  productId,
  variationProductId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      productId,
      variationProductId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "product_nonSerializedItemsSelect";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getProductTypes_drp_sql = async (
  tenant,
  userLogId,
  utcOffset,
  pageName
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "getProductTypes_drp";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};




exports.drp_stores_select_sql = async (
  tenant,
  userLogId,
  utcOffset,
  pageName
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "drp_stores_select";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getVariationTypes_drp_sql = async (
  tenant,
  userLogId,
  utcOffset,
  pageName
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "getVariationTypes_drp";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    throw error;
  }
};