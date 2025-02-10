const { contact_insert_update_sql } = require("../sql/contact");


exports.contactAdd_srv =async ( 
  tenant,
  tableId,
  contactTypeId,
  contactName,
  email,
  mobile,
  tel,
  remark) => {
  

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
  const userLogId=1;
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
  remark) => {
  

    if (!tableId) {
      return res.status(422).json({
        error: {message:"tableId is Required"},
      });
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
  const userLogId=1;
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