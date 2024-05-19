const express = require("express");
 const router = express.Router();
const { saveSystemInfo } = require("../controllers/systemSettings");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");


router.post("/systeminfo/save",setTenant,requireSignin,authMiddleware, saveSystemInfo);

module.exports = router;
