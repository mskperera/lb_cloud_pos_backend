const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.transferOrder_Insert_sql = async (
    tenant,
    state,
    sourceStoreId,
    destinationStoreId,
    transferDate,
    notes,
    orderList,
    userLogId
) => {
    const { pool } = tenant;
    const orderList_json_str = JSON.stringify(orderList);

    try {

        const procedureParameters = [
            state,
            sourceStoreId,
            destinationStoreId,
            transferDate,
            notes,
            orderList_json_str,
            userLogId
        ];

        const procedureOutputParameters = [
            "responseStatus",
            "outputMessage",
            "transferOrderId"
        ];

        const procedureName = "transferOrder_Insert";
        
        const result = await executeStoredProcedureWithOutputParamsByPool(
            procedureName,
            procedureParameters,
            procedureOutputParameters,
            pool
        );

        console.log("Transfer order result:", result.results);

        return result;
    } catch (error) {
        console.error("Error executing transferOrder_Insert_sql:", error);
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


    return {
result
    };
  } catch (error) {
    throw error;
  }
};



exports.transferOrder_receive_sql = async (
  tenant,
    transferOrderId,
    items,
      userLogId,
) => {
  try {
    const { pool } = tenant;
    const destPriceList_json_str = JSON.stringify(items);

    const procedureParameters = [
      transferOrderId,
      destPriceList_json_str,
      userLogId,
    ];

    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
    ];

    const procedureName = "transferOrder_receive";

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