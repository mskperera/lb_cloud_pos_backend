const { executeStoredProcedureWithOutputParams } = require('../mysql');
const { SP_STATUS } = require('../constants');

exports.selectUser= async(customerId, customerCode, customerName,email,mobile,tel,whatsappNumber,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName) =>{
      try {
        const procedureParameters = [
          customerId, customerCode, customerName,email,mobile,tel,whatsappNumber,
          searchByKeyword,
          skip,
          limit,
          userLogId,
          utcOffset,
          pageName
        ];
        const procedureOutputParameters = [
          "responseStatus",
          "outputMessage",
          "totalRows",
        ];
        const procedureName = "Customer_Select";
        const result = await executeStoredProcedureWithOutputParams(
          procedureName,
          procedureParameters,
          procedureOutputParameters
        );
  
        const { responseStatus, outputMessage } = result.outputValues;
        if (responseStatus === SP_STATUS.failed) {
          throw { message: outputMessage };
        }
  
        return result;
      } catch (error) {
        throw error;
      }
    }


exports.selectTenantByUn_Pass=(username,password)=>{
   return {serverCred:{server:'localhost',userName:'root',password:'1234',dbName:'pos100'},tenantId:'T100',authCred:{uName:'t100@gmail.com',password:'1234'}}
}
