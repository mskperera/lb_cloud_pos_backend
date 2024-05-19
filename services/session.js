const {
  session_Start_sql,
  session_End_sql,
  session_Select_sql,
} = require("../sql/session");

exports.sessionStart_srv = async (
  tenant,
  sessionName,
  terminalId,
  openingCash,
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
  sessionId,
  terminalId,
  closingCash,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    return await session_End_sql(
      tenant,
      sessionId,
      terminalId,
      closingCash,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );
  } catch (error) {
    console.log("sessionEnd_srv()-> error :", error);
    throw error;
  }
};

exports.getSessionEndDetails_srv = async (
  tenant,
  terminalId,
  sessionId,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName
) => {
  try {
    return await session_Select_sql(
      tenant,
      terminalId,
      sessionId,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName
    );
  } catch (error) {
    console.log("getSessionEndDetails_srv()-> error :", error);
    throw error;
  }
};
