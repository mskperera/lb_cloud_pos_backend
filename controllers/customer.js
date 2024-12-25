const { SP_STATUS } = require("../constants");
const {
  customer_insert_update,
  customer_select,
  customer_delete,
  drp_contactType_select_sql,
  drp_contact_select,
  drp_supplier_select,
  drp_customer_select,
} = require("../sql/customer");

exports.addCustomer = async (req, res) => {
  const {contactTypeId, contactName, email, mobile, tel, remark } =
    req.body;

  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const isConfirm = true;
  const saveType = "I";

  try {

    
    if (!contactTypeId) {
      return res.status(422).json({
        error: {message:"contactTypeId is Required"},
      });
    }

    if (!contactName) {
      return res.status(422).json({
        error: {message:"contactName is Required"},
      });
    }


    if (!mobile) {
      return res.status(422).json({
        error: {message:"mobile is Required"},
      });
    }


    const result = await customer_insert_update(
      tenant,
      null,
      contactTypeId,
      contactName,
      email,
      mobile,
      tel,
      remark,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );
    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

    res.status(201).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.updateCustomer = async (req, res) => {
  const { contactId } = req.params;
  const tenant = req.tenant;
  console.log("customerid", contactId);
  const {contactTypeId, contactName, email, mobile, tel, remark } = req.body;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const tableId = contactId;
  const saveType = "U";
  const isConfirm = true;

  try {

    if (!contactId) {
      return res.status(422).json({
        error: {message:"contactId is Required"},
      });
    }


    if (!contactTypeId) {
      return res.status(422).json({
        error: {message:"contactTypeId is Required"},
      });
    }

    if (!contactName) {
      return res.status(422).json({
        error: {message:"contactName is Required"},
      });
    }


    if (!mobile) {
      return res.status(422).json({
        error: {message:"mobile is Required"},
      });
    }


    const result = await customer_insert_update(
      tenant,
      tableId,
      contactTypeId,
      contactName,
      email,
      mobile,
      tel,
      remark,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );

    res.status(200).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};

exports.selectCustomer = async (req, res) => {
  const {
    contactId,
    contactTypeId,
    contactCode,
    contactName,
    email,
    mobile,
    tel,
    searchByKeyword,
    skip,
    limit,
  } = req.body;
  console.log("selectCustomer req.body: ", req.body);
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const promptBeforeContinue = false;

  try {
    const result = await customer_select(
      tenant,
      contactId,
      contactTypeId,
      contactCode,
      contactName,
      email,
      mobile,
      tel,
      searchByKeyword,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
      promptBeforeContinue
    );

    res.status(200).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { contactId, isConfirm } = req.query;

  const tenant = req.tenant;
  const _isConfirm = JSON.parse(isConfirm);
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  try {
    const result = await customer_delete(
      tenant,
      contactId,
      userLogId,
      utcOffset,
      pageName,
      _isConfirm
    );
    //const { responseStatus, outputMessage } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   return res.status(400).json({
    //     error: {
    //       message: outputMessage,
    //     },
    //   });
    // }
    // if (responseStatus === SP_STATUS.confirm) {
    //   return res.status(202).json({
    //     error: {
    //       message: outputMessage,
    //     },
    //   });
    // }

    res.json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.getContactType_dropdown =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_contactType_select_sql(tenant, userLogId,utcOffset,pageName);

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

exports.getSupplier_dropdown =async (req, res) => {
  const tenant=req.tenant;
  const userLogId=1;
  try {

  const result= await drp_supplier_select(tenant, userLogId);
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


exports.getCustomer_dropdown =async (req, res) => {
  const tenant=req.tenant;
  const userLogId=1;
  try {

  const result= await drp_customer_select(tenant, userLogId);
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

