const express = require("express");
const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const { checkNewOrderReciptAvailability_ctrl, clearPrintingData_ctrl } = require("../controllers/externalPrint");
const { getTeminallByUserId_dropdown_ctrl } = require("../controllers/terminal");



router.get(
  '/externalPrint/checkNewOrderReciptAvailability/:terminalId',
  setTenant,
  checkNewOrderReciptAvailability_ctrl
);


router.get(
  '/externalPrint/clearPrintingData',
  setTenant,
  clearPrintingData_ctrl
);


router.get(
  '/exPrint/getTeminallByUserId_exprint',
  setTenant,
  // requireSignin,
  // authMiddleware,
  getTeminallByUserId_dropdown_ctrl
);

module.exports = router;
