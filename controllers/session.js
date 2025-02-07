const {
  sessionStart_srv,
  sessionEnd_srv,
  getSessionEndDetails_srv,
  get_latest_Session_details_srv,
} = require("../services/session");
const { drp_session_select, drp_session_select_sql } = require("../sql/session");
const { stringToBoolean } = require("../utils/utils");


exports.sessionStart_ctrl = async (req, res) => {
  const { sessionName, terminalId, openingCash, isConfirm } = req.body;
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  if (!sessionName) {
    return res.status(422).json({
      error:{message: "sessionName is Required"},
    });
  }
  if (!terminalId) {
    return res.status(422).json({
      error:{message:"terminalId is Required",
    }});
  }
  if (!openingCash) {
    return res.status(422).json({
      error:{message: "openingCash is Required",
    }});
  }

  if (isConfirm===null || isConfirm==="") {
    return res.status(422).json({
     error:{message:"isConfirm is Required",
    }});
  }


  try {
    //const _isConfirm=stringToBoolean(isConfirm);
    const sessionStartRes = await sessionStart_srv(
      tenant,
      sessionName,
      terminalId,
      openingCash,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );
    if (sessionStartRes.exception) {
      return res.status(400).json(sessionStartRes);
    }

    res.status(201).json(sessionStartRes);
  } catch (err) {
    console.log("sessionStart_ctrl() -> error: ", err);
    res
      .status(500)
      .json({
        error: "Something is wrong, please contact the service provider.",
      });
  }
};

exports.sessionEnd_ctrl = async (req, res) => {
  const { sessionId,actualCash,short, isConfirm } = req.body;
  
  if (!sessionId) {
    return res.status(422).json({
      error: {message:"sessionId is Required"},
    });
  }
  if (actualCash===null) {
    return res.status(422).json({
      error: {message:"actualCash is Required"},
    });
  }
  if (short===null) {
    return res.status(422).json({
      error: {message:"short is Required"},
    });
  }

  const tenant = req.tenant;

  try {
    const sessionEndRes = await sessionEnd_srv(
      tenant,
      sessionId,actualCash,short,
      isConfirm
    );
    if (sessionEndRes.exception) {
      return res.status(400).json(sessionEndRes);
    }

    res.status(200).json(sessionEndRes);
  } catch (err) {
    console.log("sessionEnd_ctrl() -> error: ", err);
    res
      .status(500)
      .json({
        error: "Something is wrong, please contact the service provider.",
      });
  }
};


exports.getSessionEndDetails_ctrl = async (req, res) => {
  const { sessionId } = req.body;
  const tenant = req.tenant;

  try {
    const sessionEndDetailsRes = await getSessionEndDetails_srv(
      tenant,
      sessionId
    );
    if (sessionEndDetailsRes.exception) {
      return res.status(400).json(sessionEndDetailsRes);
    }

    res.status(200).json(sessionEndDetailsRes);
  } catch (err) {
    console.log("getSessionEndDetails_ctrl() -> error: ", err);
    res
      .status(500)
      .json({
        error: "Something is wrong, please contact the service provider.",
      });
  }
};

exports.getDrpSession_ctrl =async (req, res) => {

  const {descOrder,storeId} = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  const storeId_int=storeId==='null'?null:parseInt(storeId);
  console.log('descOrder  descOrder descOrderdescOrder: ',descOrder,storeId)
  //descOrder || (descOrder = 'asc');
  try {
  const result= await drp_session_select_sql(tenant, descOrder,storeId_int,userLogId,utcOffset,pageName);

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


exports.get_latest_Session_details_ctrl = async (req, res) => {
  const { terminalId } = req.query;
  const tenant = req.tenant;

  try {
    const sessionEndDetailsRes = await get_latest_Session_details_srv(
      tenant,
      terminalId
    );
    if (sessionEndDetailsRes.exception) {
      return res.status(400).json(sessionEndDetailsRes);
    }

    res.status(200).json(sessionEndDetailsRes);
  } catch (err) {
    console.log("getSessionEndDetails_ctrl() -> error: ", err);
    res
      .status(500)
      .json({
        error: "Something is wrong, please contact the service provider.",
      });
  }
};
