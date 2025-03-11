
const { drp_teminallByUserId, getAssignedTerminalsByUserId_sql,getTerminalDetailslByTerminalId_sql, getFrontendIdByTerminalId_sql } = require("../sql/terminal");

exports.getTeminallByUserId_dropdown_ctrl =async (req, res) => {

  const {userId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await drp_teminallByUserId(tenant, userId,utcOffset,pageName);

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


exports.getTerminalDetailslByTerminalId_ctrl =async (req, res) => {

  const {terminalId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await getTerminalDetailslByTerminalId_sql(tenant,terminalId);

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
}


exports.getFrontendIdByTerminalId_ctrl =async (req, res) => {

  const {terminalId } = req.query;
  const tenant=req.tenant;
  try {
  const result= await getFrontendIdByTerminalId_sql(tenant,terminalId);

      res.json(result.records);

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
}

