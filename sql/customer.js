const { SP_STATUS } = require("../constants");
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.customer_insert_update = async (tenant,
  tableId,
  contactTypeId,
  contactName,
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
      contactTypeId,
      contactName,
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
      "contactCode",
      "contactId",
    ];
    const procedureName = "Customer_Insert_Update";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );
    console.log(' Customer_Insert_Update result',result)
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
  contactId,
  contactTypeId,
  contactCode,
  contactName,
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
      contactId,
      contactTypeId,
      contactCode,
      contactName,
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

exports.drp_contactType_select_sql = async (
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
    const procedureName = "drp_contactType_select";
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
  contactId,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      contactId,
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


exports.drp_supplier_select = async (
  tenant,
  userLogId,
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId,
    ];
    const procedureOutputParameters = [];
    const procedureName = "drp_supplier_select";
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

exports.drp_customer_select = async (
  tenant,
  userLogId,
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId,
    ];
    const procedureOutputParameters = [];
    const procedureName = "drp_customer_select";
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