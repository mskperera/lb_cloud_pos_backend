const express = require("express");
 const router = express.Router();
const { saveSystemInfo } = require("../controllers/systemSettings");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");


router.post("/systeminfo/save",setTenant,requireSignin,
    roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
     saveSystemInfo);

module.exports = router;
