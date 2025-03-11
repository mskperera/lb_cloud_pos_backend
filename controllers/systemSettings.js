
const { system_info_save, initialize_systemData, isSystemDataExists_sql, drp_currencies_sql, drp_timezones_select_sql, drp_countries_select_sql, drp_languages_select_sql } = require('../sql/systemSettings');


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


exports.initializeSystemData_ctrl =async (req, res) => {
  const {userId,storeName,terminalName,currencyId,timeZoneId,utcOffset,countryId,
    languageId,companyhName
   ,address,city,province,emailAddress,tel1,tel2
  } = req.body;
  
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;



  if (!userId) {
    return res.status(422).json({
      error: {message:"userId is Required"},
    });
  }

  if (!storeName) {
    return res.status(422).json({
      error: {message:"storeName is Required"},
    });
  }

  if (!terminalName) {
    return res.status(422).json({
      error: {message:"terminalName is Required"},
    });
  }
  if (!currencyId) {
    return res.status(422).json({
      error: {message:"currencyId is Required"},
    });
  }
  if (!timeZoneId) {
    return res.status(422).json({
      error: {message:"timeZoneId is Required"},
    });
  }
  if (!utcOffset) {
    return res.status(422).json({
      error: {message:"utcOffset is Required"},
    });
  }
  if (!countryId) {
    return res.status(422).json({
      error: {message:"countryId is Required"},
    });
  }

  if (!languageId) {
    return res.status(422).json({
      error: {message:"languageId is Required"},
    });
  }
  if (!companyhName) {
    return res.status(422).json({
      error: {message:"companyhName is Required"},
    });
  }

  if (!address) {
    return res.status(422).json({
      error: {message:"address is Required"},
    });
  }
  if (!city) {
    return res.status(422).json({
      error: {message:"city is Required"},
    });
  }
  if (!province) {
    return res.status(422).json({
      error: {message:"province is Required"},
    });
  }
  if (!emailAddress) {
    return res.status(422).json({
      error: {message:"emailAddress is Required"},
    });
  }
  if (!tel1) {
    return res.status(422).json({
      error: {message:"tel1 is Required"},
    });
  }
  if (!tel2) {
    return res.status(422).json({
      error: {message:"tel2 is Required"},
    });
  }


  try {
  const result=  await initialize_systemData(tenant,userId,storeName,terminalName,
    currencyId,timeZoneId,utcOffset,countryId,languageId,companyhName,
   address,city,province,emailAddress,tel1,tel2,
    userLogId);
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

exports.drp_timezones_ctrl = async (req, res) => {
  const tenant = req.tenant;
  const userLogId=req.authUser.userLogId;
  try {
    const result = await drp_timezones_select_sql(tenant,userLogId);
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


exports.drp_countries_ctrl = async (req, res) => {
  const tenant = req.tenant;
  const userLogId=req.authUser.userLogId;
  try {
    const result = await drp_countries_select_sql(tenant,userLogId);
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

exports.drp_languages_ctrl = async (req, res) => {
  const tenant = req.tenant;
  const userLogId=req.authUser.userLogId;
  try {
    const result = await drp_languages_select_sql(tenant,userLogId);
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

