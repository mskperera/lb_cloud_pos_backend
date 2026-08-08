const {
  session_Start_sql,
  session_End_sql,
  session_Select_sql,
  sessionEndDetails_Select_sql,
  Session_get_latest_Session_details_sql,
  sessionEndProcessed_select_sql,
  sessionEndZReport_Select_sql,
} = require("../sql/session");
const { getStockInfoBy_allProductId_storeId_sql } = require("../sql/stockEntry");



exports.getStockInfoBy_allProductId_storeId_srv = async (
  tenant,
  allProductId,storeId
) => {
  try {
    return await getStockInfoBy_allProductId_storeId_sql(tenant,allProductId,storeId);

  } catch (error) {
    console.log("getSessionEndDetails_srv()-> error :", error);
    throw error;
  }
};


