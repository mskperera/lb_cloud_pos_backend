// const sql = require("mssql");
const { create } = require('xmlbuilder2');
const { pool, executeStoredProcedureWithOutputParams } = require("../mysql");
const { SP_STATUS } = require('../constants');


const grn_Insert= async(supplierId,supplierInvoiceNo,locationId,remark,grnDate,grnList,
  userLogId,utcOffset,pageName,isConfirm) =>{
    
const grnList_json=JSON.stringify(grnList);

    try{
      const procedureParameters = [supplierId,supplierInvoiceNo,locationId,remark,grnDate,grnList_json,
        userLogId,utcOffset,pageName,isConfirm];
      const procedureOutputParameters = ['responseStatus','outputMessage','grnNo'];
      const procedureName = "grn_insert";
      const result= await executeStoredProcedureWithOutputParams(procedureName,procedureParameters,procedureOutputParameters);

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



exports.grnAdd = async (req, res) => {

  const { supplierId,supplierInvoiceNo,locationId,remark,grnDate,grnList,isConfirm } = req.body;

  const utcOffset='5:30';
  const userLogId=1;
  const IsStockSupported=false;
  const pageName='p';
  const promptBeforeContinue=false;

  //visibletoEveryone,technicalReview
  try {
    if (!supplierId) {
      return res.status(422).json({
        error: "supplierId is Required",
      });
    }

    if (!supplierInvoiceNo) {
      return res.status(422).json({
        error: "supplierInvoiceNo is Required",
      });
    }
    if (!locationId) {
      return res.status(422).json({
        error: "locationId is Required",
      });
    }

    if (!grnDate) {
      return res.status(422).json({
        error: "grnDate is Required",
      });
    }


    if (!grnList || !grnList[0]) {
      return res.status(422).json({
        error: "grnList can not be empty",
      });
    }

    if (!utcOffset) {
      return res.status(422).json({
        error: "utcOffset is Required",
      });
    }

    if (!userLogId) {
      return res.status(422).json({
        error: "userLogId is Required",
      });
    }
    
   //const {userId,roleId,gmtOffset,userLogId}=req.authUser;

  const result=await grn_Insert(supplierId,supplierInvoiceNo,locationId,remark,grnDate,grnList,
    userLogId,utcOffset,pageName,isConfirm)

    res.json(result);
  } catch (err) {
    console.log('Errori: ',err)
    return res.status(400).json({ 
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack
      }
    });
  }
};

