const { SP_STATUS } = require("../constants");
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");


exports.category_select_sql = async (
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