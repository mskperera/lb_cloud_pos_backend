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

exports.reports_inventoryOnHandReport_sql = async (tenant,
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
    const procedureName = "reports_inventoryOnHandReport";
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



exports.reports_getDailySalesSummary_sql = async (tenant,
  storeId,startDate,endDate
) => {
  try {

      if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }
  if (!startDate) {
    return {
      error: {message:"startDate is Required"},
    }
  }
  if (!endDate) {
    return {
      error: {message:"endDate is Required"},
    }
  }

    const {pool}=tenant;

    const procedureParameters = [
      storeId,startDate,endDate
      
    ];
    

    const procedureOutputParameters = [
    ];
    const procedureName = "reports_getDailySalesSummary";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

     
    return result;
  } catch (error) {
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    throw error;
  }
};



exports.reports_getMonthlySalesDetails_sql = async (tenant,
  storeId,year,month
) => {
  try {


          if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }
  if (!year) {
    return {
      error: {message:"year is Required"},
    }
  }
  if (!month) {
    return {
      error: {message:"month is Required"},
    }
  }


    const {pool}=tenant;

    const procedureParameters = [
      storeId,year,month
      
    ];
    
    const procedureOutputParameters = [
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


exports.reports_getInventoryOnHand_sql = async (tenant, storeId) => {
  try {
    if (!storeId) {
      return { error: { message: "storeId is Required" } };
    }

    const { pool } = tenant;

    const procedureName = "reports_getInventoryOnHand";
    const procedureParameters = [storeId];
    const procedureOutputParameters = [];

    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    return result;
  } catch (error) {
    console.error('Error in reports_getInventoryOnHand_sql:', error);
    throw error;
  }
};

exports.reports_getLowStockReport_sql = async (tenant, storeId) => {
  try {
    if (!storeId) {
      return { error: { message: "storeId is Required" } };
    }

    const { pool } = tenant;

    const procedureName = "reports_getLowStockReport";
    const procedureParameters = [storeId];
    const procedureOutputParameters = [];

    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    return result;
  } catch (error) {
    console.error('Error in reports_getLowStockReport_sql:', error);
    throw error;
  }
};



exports.reports_getSellThroughAnalysis_sql = async (tenant, storeId, year, month) => {
  try {
    if (!storeId || !year || !month) {
      return { error: { message: "storeId, year, and month are required" } };
    }

    const { pool } = tenant;

    const procedureName = "reports_getSellThroughAnalysis";
    const procedureParameters = [parseInt(storeId), parseInt(year), parseInt(month)];

    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      [],
      pool
    );

    return result;
  } catch (error) {
    console.error('Error in reports_getSellThroughAnalysis_sql:', error);
    throw error;
  }
};