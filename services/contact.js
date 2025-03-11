const { contact_insert_update_sql } = require("../sql/contact");
const validator = require('validator');

exports.contactAdd_srv =async ( tenant, tableId,contactTypeId,contactName,
  email,mobile, tel,remark,userLogId) => {
  
 // Validation
 const errors = [];
 if (!contactTypeId) errors.push("contactTypeId is Required");
 if (!contactName) errors.push("contactName is Required");
 if (!email || !validator.isEmail(email)) errors.push("Valid email is Required");
 if (!mobile) errors.push("mobile is Required");
 if (!tel) errors.push("tel is Required");
 if (!remark) errors.push("remark is Required");

 if (errors.length > 0) {
   return { error: { message: errors.join(", ") } };
 }

 // Sanitization
 contactName = validator.escape(contactName.trim());
 email = validator.normalizeEmail(email.trim());
 mobile = validator.escape(mobile.trim());
 tel = validator.escape(tel.trim());
 remark = validator.escape(remark.trim());


  const utcOffset='5:30';
  const pageName='p';
  const promptBeforeContinue=false;
  const saveType="I";

  try {
  const result=  await contact_insert_update_sql(
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
    promptBeforeContinue);

return result;
 

} catch (error) {
  console.log("contactAdd_srv()-> error :", error);
  throw error;
}
};

exports.contactUpdate_srv =async ( 
  tenant,
  tableId,
  contactTypeId,
  contactName,
  email,
  mobile,
  tel,
  remark,
  userLogId) => {
  
   
    if (!userLogId) {
      return {
        error: {message:"userLogId is Required"},
      }
    }

    if (!tableId) {
      return {
        error: {message:"tableId is Required"},
      }
    }

  if (!contactTypeId) {
    return {
      error: {message:"contactTypeId is Required"},
    }
  }

  if (!contactName) {
    return {
      error: {message:"contactName is Required"},
    }
  }

  if (!email) {
    return {
      error: {message:"email is Required"},
    };
  }

  if (!mobile) {
    return {
      error: {message:"mobile is Required"},
    };
  }

  if (!tel) {
    return {
      error: {message:"tel is Required"},
    };
  }

  if (!remark) {
    return {
      error: {message:"remark is Required"},
    };
  }

  const utcOffset='5:30';
  const pageName='p';
  const promptBeforeContinue=false;
  const saveType="U";

  try {
  const result=  await contact_insert_update_sql(
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
    promptBeforeContinue);

return result;
 

} catch (error) {
  console.log("contactAdd_srv()-> error :", error);
  throw error;
}
};