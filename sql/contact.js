const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.contact_insert_update_sql = async (tenant,
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
    const procedureName = "contact_insert_update";
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

exports.contact_select = async (tenant,
  contactId,
  contactTypeIds,
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


    const contactTypeIdsString = contactTypeIds ? contactTypeIds.join(",") : null;

    const procedureParameters = [
      contactId,
      contactTypeIdsString,
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
    const procedureName = "contact_select";
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


exports.contact_delete = async (tenant,
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
    const procedureName = "contact_delete";
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