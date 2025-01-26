
const {
  mainDbConnection_pool,
  mainDbConnection_error_handler_pool,
} = require("../mysql/main_db_connection");
const {
  executeStoredProcedureWithOutputParamsByPool,
  executeSqlQueryWithOutputParamsByPool,
} = require("../mysql/sql_executer");

const {SP_STATUS}=require('../constants/constants');

exports.get_tenantCredentials_by_accName = async (accName) => {
  try {
    const procedureParameters = [accName];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "get_tenant_by_accName";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      mainDbConnection_pool
    );

    const { responseStatus, outputMessage } = result.outputValues;

    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result.results[0][0];
  } catch (error) {
    throw error;
  }
};

exports.get_connectionDetails_by_tenantId = async (tenantId) => {
  try {
    const procedureParameters = [tenantId];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "get_connectionDetails_by_tenantId";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      mainDbConnection_pool
    );
    const { responseStatus, outputMessage } = result.outputValues;

    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result.results[0][0];
  } catch (error) {
    throw error;
  }
};

exports.error_log_insert = async (user, tenantId, activity, errorLog) => {
  try {
    const procedureParameters = [user, tenantId, activity, errorLog];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "error_log_insert";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      mainDbConnection_error_handler_pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result.outputValues;
  } catch (error) {
    console.log("error_log_insert()->error:", error);
    throw error;
  }
};
