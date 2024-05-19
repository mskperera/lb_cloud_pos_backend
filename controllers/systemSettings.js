
const { system_info_save } = require('../sql/systemSettings');


exports.saveSystemInfo =async (req, res) => {
  const { tableId, terminalId, utcOffset,countryId,currencyId,languageId,isConfirm} = req.body;
  const tenant=req.tenant;
  const userLogId=1;
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




