const express = require("express");
const router = express.Router();
const {
  saveSystemInfo,
  initializeSystemData_ctrl,
  isSystemDataExists_ctrl,
  drp_currencies_ctrl,
  drp_timezones_ctrl,
  drp_countries_ctrl,
  drp_languages_ctrl,
  getSystemInfo_ctrl,
} = require("../controllers/systemSettings");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");

router.post(
  "/systeminfo/save",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  saveSystemInfo
);

router.post(
  "/initializeSystemData",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  initializeSystemData_ctrl
);


router.get(
  "/isSystemDataExists",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  isSystemDataExists_ctrl
);


router.get(
  "/dropdown/currencies",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  drp_currencies_ctrl
);

router.get(
  "/dropdown/timezones",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  drp_timezones_ctrl
);

router.get(
  "/dropdown/countries",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  drp_countries_ctrl
);

router.get(
  "/dropdown/languages",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  drp_languages_ctrl
);

router.get(
  "/systemInfo/getSystemInfo",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getSystemInfo_ctrl
);



module.exports = router;
