const { SP_STATUS } = require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.paid_in_out_insert_update_sql = async (tenant, tableId, description, transactionType, amount,sessionId, saveType, userLogId, utcOffset, pageName, isConfirm) => {
  try {
    const { pool } = tenant;
    const procedureParameters = [tableId, description, transactionType, amount, sessionId,saveType, userLogId, utcOffset, pageName, isConfirm];
    const procedureOutputParameters = ["responseStatus", "outputMessage", "paidInOutId"];
    const result = await executeStoredProcedureWithOutputParamsByPool("paid_in_out_insert_update", procedureParameters, procedureOutputParameters, pool);
    
    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) throw { message: outputMessage };
    return result;
  } catch (error) { throw error; }
};

exports.paid_in_out_select_sql = async (tenant, paidInOutId, transactionType, description, sessionId, skip, limit, userLogId, utcOffset, pageName) => {
  try {
    const { pool } = tenant;
    const procedureParameters = [paidInOutId, transactionType, description,sessionId, skip, limit, userLogId, utcOffset, pageName];
    const procedureOutputParameters = ["responseStatus", "outputMessage", "totalRows"];
    const result = await executeStoredProcedureWithOutputParamsByPool("paid_in_out_select", procedureParameters, procedureOutputParameters, pool);
    
    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) throw { message: outputMessage };
    return result;
  } catch (error) { throw error; }
};

exports.paid_in_out_delete_sql = async (tenant, paidInOutId, userLogId, utcOffset, pageName, isConfirm) => {
  try {
    const { pool } = tenant;
    const procedureParameters = [paidInOutId, userLogId, utcOffset, pageName, isConfirm];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    return await executeStoredProcedureWithOutputParamsByPool("paid_in_out_delete", procedureParameters, procedureOutputParameters, pool);
  } catch (error) { throw error; }
};