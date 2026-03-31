const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.transferOrder_Insert_Update_sql = async (
    tenant,
    tableId,
      sourceStoreId  ,
      destinationStoreId ,
      transferDate,
     state,
    notes,
    orderList,
    saveType,
      userLogId,
      utcOffset,
      pageName
) => {
    const {pool}=tenant;

  const orderList_json_str = JSON.stringify(orderList);
  try {

    const procedureParameters = [
      tableId,
      sourceStoreId  ,
      destinationStoreId ,
      transferDate,
     state,
    notes,
    orderList_json_str,
    saveType,
      userLogId,
      utcOffset,
      pageName
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "outTransferOrderId",
      "transferNo"
    ];
    const procedureName = "transferOrder_Insert_Update";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    console.log("transfer order result", result.results);

    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};


exports.getTransferOrders_sql = async (
  tenant,
  sourceStoreId,
  destinationStoreId,
  status,
  skip,
  limit
) => {
  try {
    const { pool } = tenant;

    const procedureParameters = [
      sourceStoreId,
      destinationStoreId,
      status,
      skip,
      limit,
    ];

    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];

    const procedureName = "getTransferOrders";

    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;

    if (responseStatus === SP_STATUS.failed || responseStatus === 'invalid') {
      throw { message: outputMessage };
    }

    return result; 
    // result.results[0] will contain the array of transfer orders
    // result.outputValues.totalRows will contain the count for pagination
  } catch (error) {
    throw error;
  }
};


exports.getTransferOrder_byId_sql = async (
  tenant,
  transferOrderId
) => {
  try {
    const { pool } = tenant;

    const procedureParameters = [
      transferOrderId,
    ];

    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
    ];

    const procedureName = "getTransferOrder_byId";

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

    // Because this SP returns two SELECT statements:
    // result.results[0] = Header Data
    // result.results[1] = Details/Items Data
    return {
      header: result.results[0][0] || null,
      details: result.results[1] || [],
      outputValues: result.outputValues
    };
  } catch (error) {
    throw error;
  }
};
