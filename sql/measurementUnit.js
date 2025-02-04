const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");
const {SP_STATUS}=require('../constants/constants');


exports.measurementUnit_select_sql = async (
  tenant,
  measurementUnitId,
  skip,
  limit,
  userLogId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      measurementUnitId,
      skip,
      limit,
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "measurementUnit_select";
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
  
exports.measurementUnit_insert_update_sql = async (tenant,
  tableId,
  measurementUnitName,
  saveType,
  userLogId,
) => {
  try {

    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      measurementUnitName,
      saveType,
      userLogId,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "measurementUnitId_out"
    ];
    const procedureName = "measurementUnit_insert_update";
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

exports.measurementUnit_delete_sql = async (tenant,
  measurementUnitId,
  userLogId
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      measurementUnitId,
      userLogId
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "measurementUnit_delete";
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


exports.measurementUnit_dropdown_select_sql = async (
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
    const procedureName = "measurementUnit_dropdown_select";
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