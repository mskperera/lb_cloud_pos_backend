const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");
const {SP_STATUS}=require('../constants/constants');

exports.dashboard_details_Select_sql = async (
  tenant,
  sessionId,
  userLogId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      sessionId,
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "dashboard_details_Select";
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
