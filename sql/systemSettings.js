const { SP_STATUS } = require("../constants");
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