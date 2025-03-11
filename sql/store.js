const {SP_STATUS,CONSOLE_TEXT_COLORS}=require('../constants/constants');
const {
  executeStoredProcedureWithOutputParamsByPool,
} = require("../mysql/sql_executer");
const { consoleSuccessText, consoleErrorText, consoleExceptionText } =
  CONSOLE_TEXT_COLORS;


  exports.userAssignedStores_select_sql = async (
    tenant,
    userId
  ) => {
    try {
      const {pool}=tenant;
  
      const procedureParameters = [userId];
      const procedureOutputParameters = [];
      const procedureName = "userAssignedStores_select";
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
  console.log('result',result)
      return result;
    } catch (error) {
      throw error;
    }
  };

