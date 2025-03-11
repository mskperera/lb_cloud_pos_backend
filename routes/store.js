const express = require("express");
 const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");
const { getUserAssignedStores_ctrl } = require("../controllers/store");

 
 router.get(
    '/stores/getUserAssignedStores',
    setTenant,
     requireSignin,
     roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
     getUserAssignedStores_ctrl
  );
  
 
  
module.exports = router;
