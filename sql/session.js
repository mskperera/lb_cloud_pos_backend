const {SP_STATUS,CONSOLE_TEXT_COLORS}=require('../constants/constants');
const {
  executeStoredProcedureWithOutputParamsByPool,
} = require("../mysql/sql_executer");

const { consoleSuccessText, consoleErrorText, consoleExceptionText } =
  CONSOLE_TEXT_COLORS;

exports.session_Start_sql = async (
  tenant,
  sessionName,
  terminalId,
  openingCash,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  const functionName = "session_Start_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      sessionName,
      terminalId,
      openingCash,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "sessionId",
    ];
    const procedureName = "Session_Start";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      console.log(
        consoleExceptionText,
        `${functionName} -> exception:`,
        outputMessage
      );
      return { exception: { message: outputMessage } };
    }

    const message = outputMessage;
    console.log(consoleSuccessText, `${functionName} -> success: ${message} `);
    return {success:{ message: outputMessage } };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};

exports.session_End_sql = async (
  tenant,
  sessionId,
  actualCash,
  short,
  isConfirm
) => {
  const functionName = "session_End_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      sessionId,
      actualCash,
      short,
      isConfirm,
    ];

    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "Session_End";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      console.log(
        consoleExceptionText,
        `${functionName} -> exception:`,
        outputMessage
      );
      return { exception: { message: outputMessage } };
    }

    const message = outputMessage;
    console.log(consoleSuccessText, `${functionName} -> success: ${message} `);
    return {success:{ message: outputMessage } };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};

exports.session_Select_sql = async (
  tenant,
  terminalId,
  sessionId,
  skip,
  limit,
  userLogId,
  utcOffset,
  pageName
) => {
  const functionName = "session_Select_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      terminalId,
      sessionId,
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
    const procedureName = "Session_Select";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      console.log(
        consoleExceptionText,
        `${functionName} -> exception:`,
        outputMessage
      );
      return { exception: { message: outputMessage } };
    }

    const message = outputMessage;
    console.log(consoleSuccessText, `${functionName} -> success: ${message} `);
    return { message,records: result.results[0], values: result.outputValues };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};

exports.sessionEndDetails_Select_sql = async (
  tenant,
  sessionId,
) => {
  const functionName = "SessionEndDetails_Select_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      sessionId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "SessionEndDetails_Select";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      console.log(
        consoleExceptionText,
        `${functionName} -> exception:`,
        outputMessage
      );
      return { exception: { message: outputMessage } };
    }

    const message = outputMessage;
    console.log(consoleSuccessText, `${functionName} -> success: ${message} `);
    return { message,records: result.results[0], values: result.outputValues };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};

exports.drp_session_select_sql = async (
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
    const procedureName = "drp_session_select";
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

exports.Session_get_latest_Session_details_sql = async (
  tenant,
  terminalId
) => {
  const functionName = "session_Select_sql()";
  try {
    const { pool } = tenant;
    const procedureParameters = [
      terminalId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "Session_get_latest_Session_details";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );

    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      console.log(
        consoleExceptionText,
        `${functionName} -> exception:`,
        outputMessage
      );
      return { exception: { message: outputMessage } };
    }

    const message = outputMessage;
    console.log(consoleSuccessText, `${functionName} -> success: ${message} `);
    return { success:{message},records: result.results[0][0], values: result.outputValues };
  } catch (error) {
    console.error(consoleErrorText, `${functionName} -> error :`, error);
    throw error;
  }
};