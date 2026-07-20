const {
  session_Start_sql,
  session_End_sql,
  session_Select_sql,
  sessionEndDetails_Select_sql,
  Session_get_latest_Session_details_sql,
  sessionEndProcessed_select_sql,
  sessionEndZReport_Select_sql,
} = require("../sql/session");

exports.sessionStart_srv = async (
  tenant,
  sessionName,
  terminalId,
  openingCash,
  openingNote,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    return await session_Start_sql(
      tenant,
      sessionName,
      terminalId,
      openingCash,
      openingNote,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );
  } catch (error) {
    console.log("sessionStart_srv()-> error :", error);
    throw error;
  }
};

exports.sessionEnd_srv = async (
  tenant,
  sessionId,actualCash,actualCardTotal,cardShortOver,terminalSlipNo,short, isConfirm
) => {
  try {
    return await session_End_sql(
      tenant,
      sessionId,actualCash,actualCardTotal,cardShortOver,terminalSlipNo,short, isConfirm
    );
  } catch (error) {
    console.log("sessionEnd_srv()-> error :", error);
    throw error;
  }
};

exports.getSessionEndDetails_srv = async (
  tenant,
  sessionId,
) => {
  try {
    return await sessionEndDetails_Select_sql(
      tenant,
      sessionId
    );
  } catch (error) {
    console.log("getSessionEndDetails_srv()-> error :", error);
    throw error;
  }
};

exports.get_latest_Session_details_srv = async (
  tenant,
  terminalId,
) => {
  try {
    return await Session_get_latest_Session_details_sql(
      tenant,
      terminalId
    );
  } catch (error) {
    console.log("getSessionEndDetails_srv()-> error :", error);
    throw error;
  }
};

exports.getSessionEndProcessedDetails_srv = async (
  tenant,
  sessionId,
  terminalId,
  startDate,
  endDate,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName
) => {
  try {
    return await sessionEndProcessed_select_sql(
      tenant,
      sessionId,
      terminalId,
      startDate,
      endDate,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName
    );
  } catch (error) {
    console.log("getSessionEndProcessedDetails_srv()-> error :", error);
    throw error;
  }
};

exports.getSessionEndZReport_srv = async (
  tenant,
  sessionId
) => {
  try {
    return await sessionEndZReport_Select_sql(tenant, sessionId);
  } catch (error) {
    console.log("getSessionEndZReport_srv()-> error :", error);
    throw error;
  }
};

