const { SP_STATUS } = require("../constants");
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.product_insertUpdate_sql = async (
  tenant,
  tableId,
  branchId,
  companyId,
  productNo,
  isProductNoAutoGenerate,
  productName,
  categoryIdList,
  measurementUnitID,
  unitPrice,
  departmentId,
  barcode,
  reorderLevel,
  saveType,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {

    const categoryIdList_json=JSON.stringify(categoryIdList);
    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      branchId,
      companyId,
      productNo,
      isProductNoAutoGenerate,
      productName,
      categoryIdList_json,
      measurementUnitID,
      unitPrice,
      departmentId,
      barcode,
      reorderLevel,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
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

exports.product_select_sql = async (
  tenant,
  productId,
  productNo,
  productName,
  barcode,
  productCategoryId,
  measurementUnitId,
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
      barcode,
      productCategoryId,
      measurementUnitId,
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
