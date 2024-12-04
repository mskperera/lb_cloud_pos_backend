const {
  sessionStart_srv,
  sessionEnd_srv,
  getSessionEndDetails_srv,
} = require("../services/session");
const { drp_teminallByUserId, getAssignedTerminalsByUserId_sql,getTerminalDetailslByTerminalId_sql } = require("../sql/terminal");
const { stringToBoolean } = require("../utils/utils");



exports.getTeminallByUserId_dropdown_ctrl =async (req, res) => {

  const {userId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_teminallByUserId(tenant, userLogId,utcOffset,pageName);

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


exports.getAssignedTerminalsByUserId_ctrl =async (req, res) => {

  const {userId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await getAssignedTerminalsByUserId_sql(tenant,userId);

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
  const userLogId=1;
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


