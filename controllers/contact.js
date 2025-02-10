const {SP_STATUS}=require('../constants/constants');
const { contactAdd_srv, contactUpdate_srv } = require('../services/contact');
const {
  contact_insert_update,
  contact_select,
  contact_delete,
  drp_contactType_select_sql,
  drp_supplier_select,
  drp_customer_select,
} = require("../sql/contact");

exports.addContact_ctrl = async (req, res) => {

  const {contactTypeId, contactName, email, mobile, tel, remark } = req.body;
 
  const tenant = req.tenant;

  try {

  console.log('add contactTypeId',contactTypeId);
    const result = await contactAdd_srv(
      tenant,
      null,
      contactTypeId,
      contactName,
      email,
      mobile,
      tel,
      remark
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


exports.updateContact_ctrl = async (req, res) => {

    const { contactId } = req.params;
    const {contactTypeId, contactName, email, mobile, tel, remark } =req.body;

  const tenant = req.tenant;

  try {

    const result = await contactUpdate_srv(
      tenant,
      contactId,
      contactTypeId,
      contactName,
      email,
      mobile,
      tel,
      remark
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



exports.selectContact = async (req, res) => {
  const {
    contactId,
    contactTypeIds,
    contactCode,
    contactName,
    email,
    mobile,
    tel,
    searchByKeyword,
    skip,
    limit,
  } = req.body;
  console.log("selectContact req.body: ", req.body);
  
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const promptBeforeContinue = false;

if (!Array.isArray(contactTypeIds)) {
  return res.status(400).json({
    error: {
      message: "Invalid data type: contactTypeIds should be an array.",
    },
  });
}

  try {
    const result = await contact_select(
      tenant,
      contactId,
      contactTypeIds,
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

exports.deleteContact = async (req, res) => {
  const { contactId, isConfirm } = req.query;

  const tenant = req.tenant;
  const _isConfirm = JSON.parse(isConfirm);
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  try {
    const result = await contact_delete(
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

