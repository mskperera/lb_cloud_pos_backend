const express = require("express");
 const router = express.Router();
const { sessionEnd, getSessionEndDetails, sessionStart_ctrl, sessionEnd_ctrl, getSessionEndDetails_ctrl, getDrpSession_ctrl } = require("../controllers/session");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");


 router.post("/session/start",setTenant,requireSignin, sessionStart_ctrl);
 router.post("/session/end",setTenant,requireSignin, sessionEnd_ctrl);
 router.post("/session/end/get",setTenant,requireSignin, getSessionEndDetails_ctrl);
 router.get(
    '/dropdown/getDrpSession',
    setTenant,
    requireSignin,
    authMiddleware,
    getDrpSession_ctrl
  );
  
  
 
module.exports = router;
