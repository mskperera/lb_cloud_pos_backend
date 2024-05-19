const { SP_STATUS } = require("../constants");
const {
  executeStoredProcedureWithOutputParamsByPool,
} = require("../mysql/sql_executer");

exports.shelf_Insert = async (
  tenant,
  transferDate,
  shelfList,
  userId,
  remark,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  const { pool } = tenant;
  const shelfList_json = JSON.stringify(shelfList);

  try {
    const procedureParameters = [
      transferDate,
      shelfList_json,
      userId,
      remark,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "p_ReferenceNumber",
    ];
    const procedureName = "shelf_insert";
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
