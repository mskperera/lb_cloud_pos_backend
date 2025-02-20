const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.userRegistration_insert_update_sql = async (tenant,
  tableId,
  userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      p_profilePic,
      p_isActive,
      saveType,
      userLogId,
      utcOffset
) => {
  try {

    const {pool}=tenant;
    const procedureParameters = [
      tableId,
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      p_profilePic,
      p_isActive,
      saveType,
      userLogId,
      utcOffset
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "userId_out",
    ];
    const procedureName = "userRegistration_insert_update";
    const result = await executeStoredProcedureWithOutputParamsByPool(
      procedureName,
      procedureParameters,
      procedureOutputParameters,
      pool
    );
    console.log(' userRegistration_insert_update result',result)
    const { responseStatus, outputMessage } = result.outputValues;
    if (responseStatus === SP_STATUS.failed) {
      throw { message: outputMessage };
    }
    

    return result;
  } catch (error) {
    throw error;
  }
};



// exports.userRegistration_select_sql = async (tenant,
//   contactId,
//   contactTypeIds,
//   contactCode,
//   contactName,
//   email,
//   mobile,
//   tel,
//   searchByKeyword,
//   skip,
//   limit,
//   userLogId,
//   utcOffset,
//   pageName
// ) => {
//   try {
//     const {pool}=tenant;


//     const contactTypeIdsString = contactTypeIds ? contactTypeIds.join(",") : null;

//     const procedureParameters = [
//       contactId,
//       contactTypeIdsString,
//       contactCode,
//       contactName,
//       email,
//       mobile,
//       tel,
//       searchByKeyword,
//       skip,
//       limit,
//       userLogId,
//       utcOffset,
//       pageName,
//     ];
//     const procedureOutputParameters = [
//       "responseStatus",
//       "outputMessage",
//       "totalRows",
//     ];
//     const procedureName = "userRegistration_select_by_userName";
//     const result = await executeStoredProcedureWithOutputParamsByPool(
//       procedureName,
//       procedureParameters,
//       procedureOutputParameters,
//       pool
//     );

//     const { responseStatus, outputMessage } = result.outputValues;
//     if (responseStatus === SP_STATUS.failed) {
//       throw { message: outputMessage };
//     }

//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

exports.userRegistration_select_sql = async (tenant,
  userId,
  userRoleIds,
  uName,
  email,
  searchByKeyword,
  skip,
  limit,
  userLogId
) => {
  try {
    const {pool}=tenant;

    const userRoleIdsString = userRoleIds ? userRoleIds.join(",") : null;

    const procedureParameters = [
      userId,
      userRoleIdsString,
      uName,
      email,
      searchByKeyword,
      skip,
      limit,
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage",
      "totalRows",
    ];
    const procedureName = "userRegistration_select";
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



exports.userRegistration_delete_sql = async (tenant,
  userId,
  userLogId,
  utcOffset,
  pageName,
  isConfirm
) => {
  try {
    const {pool}=tenant;
    const procedureParameters = [
      userId,
      userLogId,
      utcOffset,
      pageName,
      isConfirm,
    ];
    const procedureOutputParameters = ["responseStatus", "outputMessage"];
    const procedureName = "userRegistration_delete";
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



exports.drp_userRole_select_sql = async (
  tenant,
  userLogId
) => {
  const { pool } = tenant;
  try {
    const procedureParameters = [
      userLogId
    ];
    const procedureOutputParameters = [
      "responseStatus",
      "outputMessage"
    ];
    const procedureName = "drp_userRole_select";
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