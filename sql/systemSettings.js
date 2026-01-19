const {SP_STATUS}=require('../constants/constants');
const { executeStoredProcedureWithOutputParamsByPool } = require("../mysql/sql_executer");

exports.system_info_save= async(tenant,tableId,terminalId, utcOffset,countryId,currencyId,languageId,
    userLogId,pageName,isConfirm) =>{
        const { pool } = tenant;
        try{ 
          const procedureParameters = [tableId,terminalId, utcOffset,countryId,currencyId,languageId,
           userLogId,pageName,isConfirm];
          const procedureOutputParameters = ['responseStatus','outputMessage','systemInfoId'];
          const procedureName = 'system_info_save';
          const result= await executeStoredProcedureWithOutputParamsByPool(procedureName,procedureParameters,procedureOutputParameters,pool);
          
          const { responseStatus, outputMessage } = result.outputValues;
          if (responseStatus === SP_STATUS.failed) {
            throw { message: outputMessage };
          }
  
          return result;
          }
          catch(error){
            throw error;
          }
    }





exports.initialize_systemData = async (
  tenant,
  storeName,
  terminalName,
  currencyId,
  timeZoneId,
  utcOffset,
  countryCode,
  countryName,
  languageId,
  companyName,
  address,
  city,
  province,
  emailAddress,
  tel1,
  tel2,
  userLogId
) => {

  const { pool } = tenant;

  try {
    const procedureName = 'systemData_initialize';

    const procedureParameters = [
      storeName,
      terminalName,
      currencyId,
      timeZoneId,
      utcOffset,
      countryCode,
      countryName,
      languageId,
      companyName,
      address,
      city,
      province,
      emailAddress,
      tel1,
      tel2,
      userLogId
    ];

    const procedureOutputParameters = [
      'responseStatus',
      'outputMessage'
    ];

    const result =
      await executeStoredProcedureWithOutputParamsByPool(
        procedureName,
        procedureParameters,
        procedureOutputParameters,
        pool
      );

    const { responseStatus, outputMessage } = result.outputValues;

    if (responseStatus === SP_STATUS.failed) {
      throw new Error(outputMessage);
    }

    return result;

  } catch (error) {
    throw error;
  }
};



  exports.isSystemDataExists_sql = async (
    tenant,userLogId
  ) => {
    const { pool } = tenant;
    try {
      const procedureParameters = [userLogId];
      const procedureOutputParameters = [
        "isExists"
      ];
      const procedureName = "systemData_isExists";
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




  exports.drp_currencies_sql = async (
    tenant,
    userLogId,
  ) => {
    const { pool } = tenant;
    try {
      const procedureParameters = [
        userLogId,
      ];
      const procedureOutputParameters = [];
      const procedureName = "drp_currencies_select";
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
  





  exports.getSystemInfo_sql = async (
    tenant
  ) => {
    const { pool } = tenant;
    try {
      const procedureParameters = [];
      const procedureOutputParameters = [];
      const procedureName = "get_SystemInfo";
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

  