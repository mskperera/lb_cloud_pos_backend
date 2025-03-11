const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");


exports.reports_getProducts_sql = async (tenant,
  storeId
) => {
  try {
    const {pool}=tenant;

    const procedureParameters = [
      storeId
    ];
    
    const procedureOutputParameters = [
      "totalRows",
    ];
    const procedureName = "reports_getProducts";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    //const { totalRows } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   throw { message: outputMessage };
    // }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.reports_getInventoryStockLevel_sql = async (tenant,
  storeId
) => {
  try {
    const {pool}=tenant;

    const procedureParameters = [
      storeId
    ];
    
    const procedureOutputParameters = [
      "totalRows",
    ];
    const procedureName = "reports_getInventoryStockLevel";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    //const { totalRows } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   throw { message: outputMessage };
    // }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.reports_getDailySalesDetails_sql = async (tenant,
  storeId,sessionId
) => {
  try {
    const {pool}=tenant;

    const procedureParameters = [
      storeId,
      sessionId
    ];
    
    const procedureOutputParameters = [
      "totalRows",
    ];
    const procedureName = "reports_getDailySalesDetails";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    //const { totalRows } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   throw { message: outputMessage };
    // }

    return result;
  } catch (error) {
    throw error;
  }
};


exports.reports_getMonthlySalesDetails_sql = async (tenant,
  storeId,year,month
) => {
  try {
    const {pool}=tenant;

    const procedureParameters = [
      storeId, year,month
      
    ];
    
    const procedureOutputParameters = [
      "totalRows",
    ];
    const procedureName = "reports_getMonthlySalesDetails";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    //const { totalRows } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   throw { message: outputMessage };
    // }

    return result;
  } catch (error) {
    throw error;
  }
};