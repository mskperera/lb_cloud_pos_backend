const express = require("express");
 const router = express.Router();
const { sessionEnd, getSessionEndDetails, sessionStart_ctrl, sessionEnd_ctrl, getSessionEndDetails_ctrl, getDrpSession_ctrl } = require("../controllers/session");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const { getTeminallByUserId_dropdown_ctrl, getAssignedTerminalsByUserId_ctrl ,getTerminalDetailslByTerminalId_ctrl, getFrontendIdByTerminalId_ctrl} = require("../controllers/terminal");


 router.post("/session/start",setTenant, sessionStart_ctrl);
 router.post("/session/end",setTenant, sessionEnd_ctrl);
 router.post("/session/end/get",setTenant, getSessionEndDetails_ctrl);
 router.get(
    '/dropdown/getTeminallByUserId',
    setTenant,
    // requireSignin,
    // authMiddleware,
    getTeminallByUserId_dropdown_ctrl
  );
  
  router.get(
    '/terminal/getAssignedTerminalsByUserId',
    setTenant,
    // requireSignin,
    // authMiddleware,
    getAssignedTerminalsByUserId_ctrl
  );
 
  router.get(
    '/terminal/getTerminalDetailslByTerminalId',
    setTenant,
    // requireSignin,
    // authMiddleware,
    getTerminalDetailslByTerminalId_ctrl
  );
 
 
  router.get(
    '/terminal/getFrontendIdByTerminalId',
    setTenant,
    // requireSignin,
    // authMiddleware,
    getFrontendIdByTerminalId_ctrl
  );

  
module.exports = router;
