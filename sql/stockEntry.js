const { SP_STATUS } = require("../constants");
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.stockEntry_Insert = async (
    tenant,
    supplierId,
    storeId,
    stockReceivedDate,
    amountPaid,
    remark,
    supplierBillNo,
    orderList,
    userLogId,
    utcOffset,
    pageName,
    isConfirm,
) => {
    const {pool}=tenant;

  const orderList_json = JSON.stringify(orderList);
  try {
    const procedureParameters = [
      supplierId,
      storeId,
      stockReceivedDate,
     amountPaid,
    remark,
    supplierBillNo,
      orderList_json,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "orderId"
    ];
    const procedureName = "StockEntry_Insert";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );
    console.log("stock_Insert result", result.results);
    // console.log('executeStoredProcedureWithOutputParams',result);
    const { responseStatus, outputMessage } = result.outputValues;
 
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }

    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

exports.stockEntry_Select = async (
  tenant,
  stockEntryId,
      storeId,
      stockEntryRefNo,
      fromDate,
      toDate,
      supplierId,
      supplierCode,
      suppliertName,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
) => {
  try {
    const {pool}=tenant;

    const procedureParameters = [
      stockEntryId,
      storeId,
      stockEntryRefNo,
      fromDate,
      toDate,
      supplierId,
      supplierCode,
      suppliertName,
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
    const procedureName = "StockEntry_Select";
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

exports.OrderReceipt_SelectByOrderId = async (
    tenant,
  orderId,
  userLogId,
  utcOffset,
  pageName
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [orderId, userLogId, utcOffset, pageName];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "OrderReceipt_SelectByOrderId";
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

exports.voidOrder_By_OrderId = async (
    tenant,
  orderId,
  reasonId,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      orderId,
      reasonId,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "VoidOrderByOrderId";
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


exports.drp_order_voiding_reason_select = async (
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
    const procedureName = "drp_order_voiding_reason_select";
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

exports.OrderFull_Select = async (
  tenant,
  orderId,
  orderNo,
  userLogId
) => {
  try {
    const {pool}=tenant;

   

    const procedureParameters = [
      orderId,
      orderNo,
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "OrderFull_Select";
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

exports.checkNewOrderReciptAvailability_sql = async (
  tenant,
terminalId
) => {
  try {
    const {pool}=tenant;

  
    const procedureParameters = [
      terminalId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "external_checkNewOrderReciptAvailability";
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

exports.clearPrintingData_sql = async (
  tenant,
terminalId
) => {
  try {
    const {pool}=tenant;

  
    const procedureParameters = [
      terminalId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "external_clearPrintingData";
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