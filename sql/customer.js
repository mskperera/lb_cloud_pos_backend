const { SP_STATUS } = require("../constants");
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.customer_insert_update = async (tenant,
  tableId,
  customerName,
  email,
  mobile,
  tel,
  remark,
  saveType,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      customerName,
      email,
      mobile,
      tel,
      remark,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "customerCode",
      "customerId",
    ];
    const procedureName = "Customer_Insert_Update";
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

exports.customer_select = async (tenant,
  customerId,
  customerCode,
  customerName,
  email,
  mobile,
  tel,
  searchByKeyword,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      customerId,
      customerCode,
      customerName,
      email,
      mobile,
      tel,
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
    const procedureName = "Customer_Select";
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

exports.customer_delete = async (tenant,
  customerId,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      customerId,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "Customer_Delete";
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
