const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");
const {SP_STATUS}=require('../constants/constants');

exports.category_select_sql = async (
  tenant,
  categoryId,
  skip,
  limit,
  userLogId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      categoryId,
      skip,
      limit,
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "category_select";
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
  
exports.category_insert_update_sql = async (tenant,
  tableId,
  categoryName,
  saveType,
  userLogId,
) => {
  try {

    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      categoryName,
      saveType,
      userLogId,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "categoryId_out"
    ];
    const procedureName = "category_insert_update";
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

exports.category_delete_sql = async (tenant,
  categoryId,
  userLogId
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      categoryId,
      userLogId
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "category_delete";
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


exports.category_register_menu_select_sql = async (
  tenant,
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
      userLogId,
      utcOffset,
      pageName,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
    ];
    const procedureName = "category_register_menu_select";
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
  

exports.category_dropdown_select_sql = async (
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
    const procedureName = "category_dropdown_select";
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