
const { system_info_save, initialize_systemData, isSystemDataExists_sql, drp_currencies_sql, drp_timezones_select_sql, drp_countries_select_sql, drp_languages_select_sql, getSystemInfo_sql } = require('../sql/systemSettings');


exports.saveSystemInfo =async (req, res) => {
  const { tableId, terminalId, utcOffset,countryId,currencyId,languageId,isConfirm} = req.body;
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result=  await system_info_save(tenant,tableId,terminalId, utcOffset,countryId,currencyId,languageId,
         userLogId,pageName,isConfirm);
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

exports.validateInitializeSystemData = (data) => {
  if (!data.storeName) return 'Store name is required';
  if (!data.terminalName) return 'Terminal name is required';
  if (!data.currencyId) return 'Currency is required';
  if (!data.timeZoneId) return 'Time zone is required';
  if (!data.utcOffset) return 'UTC offset is required';
  if (!data.countryCode) return 'Country code is required';
  if (!data.countryName) return 'Country name is required';
  if (!data.languageId) return 'Language is required';
  if (!data.companyName) return 'Company name is required';
  if (!data.address) return 'Address is required';
  if (!data.city) return 'City is required';
  if (!data.province) return 'Province is required';
  if (!data.emailAddress) return 'Email address is required';
  if (!data.tel1) return 'Telephone 1 is required';
 // if (!data.tel2) return 'Telephone 2 is required';

  return null;
};


exports.initializeSystemData_ctrl = async (req, res) => {
  const {
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
    tel2
  } = req.body;

  const tenant = req.tenant;
  const userLogId = req.authUser.userLogId;

  console.log('tenant:',tenant)

  // ✅ Validation
  const requiredFields = {
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
    tel2
  };

 const validationError = this.validateInitializeSystemData(req.body);

if (validationError) {
  return res.status(422).json({
    error: { message: validationError }
  });
}

  try {
    const result = await initialize_systemData(
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
    );

    return res.json(result);

  } catch (err) {
    console.error('Error: ', err);
  //  add_error_log_srv()
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack
      }
    });
  }
};



exports.isSystemDataExists_ctrl = async (req, res) => {
  const tenant = req.tenant;
  const userLogId=req.authUser.userLogId;
  try {
    const result = await isSystemDataExists_sql(tenant,userLogId);
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


exports.drp_currencies_ctrl = async (req, res) => {
  const tenant = req.tenant;
  const userLogId=req.authUser.userLogId;
  try {
    const result = await drp_currencies_sql(tenant,userLogId);
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




exports.getSystemInfo_ctrl = async (req, res) => {
  const tenant = req.tenant;
  try {
    const result = await getSystemInfo_sql(tenant);
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

