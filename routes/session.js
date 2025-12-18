const express = require("express");
const router = express.Router();
const {
  sessionStart_ctrl,
  sessionEnd_ctrl,
  getSessionEndDetails_ctrl,
  getDrpSession_ctrl,
  get_latest_Session_details_ctrl,
  getSessionMismatchCheck_ctrl,
} = require("../controllers/session");
const { setTenant } = require("../middlewares/tenancyManage");
const {
  requireSignin,
  roleMiddleware,
} = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");

router.post(
  "/session/start",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  sessionStart_ctrl
);
router.post(
  "/session/end",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  sessionEnd_ctrl
);
router.post(
  "/session/end/get",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  getSessionEndDetails_ctrl
);

router.get(
  "/dropdown/getDrpSession",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  getDrpSession_ctrl
);

router.get(
  "/session/getLatestSessionDetails",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  get_latest_Session_details_ctrl
);


router.get(
  "/session/mismatchCheck/get",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  getSessionMismatchCheck_ctrl
);


module.exports = router;
