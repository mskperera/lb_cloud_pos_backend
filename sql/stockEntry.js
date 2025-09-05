const {SP_STATUS}=require('../constants/constants');
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

    //checkForSQlError(result);
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

// const checkForSQlError= (result)=>{

//   const error=result[0][0]?.Level;
// if(error==="Error"){
//   console.log('SQl Error: ',result[0][0].Message);
// }
// }

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

exports.stockEntry_full_Select = async (
    tenant,
  stockEntryId,
  userLogId
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [stockEntryId, userLogId];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "StockEntry_full_Select";
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


exports.drp_stockEntry_voiding_reason_select = async (
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
    const procedureName = "drp_stockEntry_voiding_reason_select";
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

exports.stockEntry_void = async (
  tenant,
  stockEntryId,
  voidingReasonId,
  userLogId,
  utcOffset,
  pageName
) => {
  const {pool}=tenant;
try {
  const procedureParameters = [
    stockEntryId,
    voidingReasonId,
    userLogId,
    utcOffset,
    pageName
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "StockEntry_void";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );
  console.log("StockEntry_void result", result.results);
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



exports.getStockInfo_sql = async (
  tenant,
  inventoryId,
  showZeroStockQtyData
) => {
try {
  const {pool}=tenant;
  const procedureParameters = [inventoryId,showZeroStockQtyData];
  const procedureOutputParameters = ["isSelectBatchManually"];
  const procedureName = "getStockInfo";
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


exports.stock_adjust_sql = async (
  tenant,
  stockBatchId,
  adjustedQty,
  adjustmentTypeId,
  adjustmentReasonId,
  adjustmentReasonOtherRemark,
  userLogId,
  utcOffset,
  pageName
) => {
  const {pool}=tenant;
try {
  const procedureParameters = [
    stockBatchId,
  adjustedQty,
  adjustmentTypeId,
  adjustmentReasonId,
  adjustmentReasonOtherRemark,
  userLogId,
  utcOffset,
  pageName
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "stock_adjust";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );
  console.log("stock_adjust result", result.results);
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


exports.get_stock_adjustments_sql = async (
  tenant,
  stockBatchId
) => {
  const {pool}=tenant;
try {
  const procedureParameters = [
    stockBatchId
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "get_stock_adjustments";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );
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


exports.drp_adjustmentReasons_select_sql = async (
  tenant,
  adjustmentTypeId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      adjustmentTypeId
    ];
    const procedureOutputParameters = [];
    const procedureName = "drp_adjustmentReasons_select";
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


exports.update_price_cost_sql = async (
  tenant,
  stockBatchId,
  newUnitPrice,
  newUnitCost,
  changeReason,
  userLogId,
  utcOffset,
  pageName
) => {
  const {pool}=tenant;
try {

  const procedureParameters = [
    stockBatchId,
    newUnitPrice,
    newUnitCost,
    changeReason,
  userLogId,
  utcOffset,
  pageName
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "update_price_cost";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );
  console.log("update_price_cost result", result.results);
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



exports.get_price_change_log_sql = async (
  tenant,
  stockBatchId
) => {
  const {pool}=tenant;
try {
  const procedureParameters = [
    stockBatchId
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "get_price_change_log";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );
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



exports.releaseStockBatch_sql = async (
  tenant,
  stockBatchId,
  stopRelease
) => {
  const {pool}=tenant;
try {

  const procedureParameters = [
    stockBatchId,
    stopRelease
  ];
  const procedureOutputParameters = [
    "responseStatus",
    "outputMessage"
  ];
  const procedureName = "releaseStockBatch";
  const result = await executeStoredProcedureWithOutputParamsByPool(
    procedureName,
    procedureParameters,
    procedureOutputParameters,
    pool
  );

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


exports.get_inventory_transation_history_sql = async (
  tenant,
  inventoryId,
  storeId,
  skip,
  limit
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
  inventoryId,
  storeId,
  skip,limit
    ];
    const procedureOutputParameters = [
      "totalRows",
    ];
    const procedureName = "get_inventory_transaction_history";
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

