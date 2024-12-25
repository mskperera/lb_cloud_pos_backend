const express = require("express");
 const router = express.Router();
const { sessionEnd, getSessionEndDetails, sessionStart_ctrl, sessionEnd_ctrl, getSessionEndDetails_ctrl, getDrpSession_ctrl, get_latest_Session_details_ctrl } = require("../controllers/session");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");


 router.post("/session/start",setTenant, sessionStart_ctrl);
 router.post("/session/end",setTenant, sessionEnd_ctrl);
 router.post("/session/end/get",setTenant, getSessionEndDetails_ctrl);
 router.get(
    '/dropdown/getDrpSession',
    setTenant,
    // requireSignin,
    // authMiddleware,
    getDrpSession_ctrl
  );
  
  router.get(
    '/session/getLatestSessionDetails',
    setTenant,
    // requireSignin,
    // authMiddleware,
    get_latest_Session_details_ctrl
  );
 
module.exports = router;
