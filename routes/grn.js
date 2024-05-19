const express = require("express");
const router = express.Router();
const { grnAdd } = require("../controllers/grn");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

router.post(
  "/grn/grnAdd",
  setTenant,
  requireSignin,
  authMiddleware,
  grnAdd
);


module.exports = router;
