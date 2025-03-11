const {SP_STATUS,CONSOLE_TEXT_COLORS}=require('../constants/constants');
const {
  executeStoredProcedureWithOutputParamsByPool,
} = require("../mysql/sql_executer");

const { consoleSuccessText, consoleErrorText, consoleExceptionText } =
  CONSOLE_TEXT_COLORS;



exports.drp_teminallByUserId = async (
  tenant,
  userId,
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "drp_teminalsByUserId";
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

    return result.results[0];
  } catch (error) {
    throw error;
  }
};



exports.getTerminalDetailslByTerminalId_sql = async (
  tenant,
  terminalId
) => {
  const functionName = "getTerminalDetailslByTerminalId_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      terminalId
    ];
    const procedureOutputParameters = [
    ];
    const procedureName = "getTerminalDetailslByTerminalId";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    return {records: result.results[0][0] };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};

exports.getFrontendIdByTerminalId_sql = async (
  tenant,
  terminalId
) => {
  const functionName = "get_frontendId_by_terminalId_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      terminalId
    ];
    const procedureOutputParameters = [
    ];
    const procedureName = "get_frontendId_by_terminalId";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    return {records: result.results[0][0] };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};