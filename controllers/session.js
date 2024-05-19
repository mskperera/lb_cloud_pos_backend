const {
  sessionStart_srv,
  sessionEnd_srv,
  getSessionEndDetails_srv,
} = require("../services/session");
const { drp_session_select, drp_session_select_sql } = require("../sql/session");


exports.sessionStart_ctrl = async (req, res) => {
  const { sessionName, terminalId, openingCash, isConfirm } = req.body;
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  if (!sessionName) {
    return res.status(422).json({
      error: "sessionName is Required",
    });
  }
  if (!terminalId) {
    return res.status(422).json({
      error: "terminalId is Required",
    });
  }
  if (!openingCash) {
    return res.status(422).json({
      error: "openingCash is Required",
    });
  }

  if (!isConfirm) {
    return res.status(422).json({
      error: "isConfirm is Required",
    });
  }

  try {
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
  const { sessionId, terminalId, closingCash, isConfirm } = req.body;
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  try {
    const sessionEndRes = await sessionEnd_srv(
      tenant,
      sessionId,
      terminalId,
      closingCash,
      userLogId,
      utcOffset,
      pageName,
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
  const { terminalId, sessionId, skip, limit } = req.body;
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  try {
    const sessionEndDetailsRes = await getSessionEndDetails_srv(
      tenant,
      terminalId,
      sessionId,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName
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

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_session_select_sql(tenant, userLogId,utcOffset,pageName);

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
