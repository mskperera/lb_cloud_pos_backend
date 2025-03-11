const express = require("express");
const router = express.Router();

const { setTenant } = require("../middlewares/tenancyManage");
const {
  requireSignin,
  roleMiddleware,
} = require("../middlewares/auth");
const {
  deleteUserRegistration_ctrl,
  getUserRole_dropdown_ctrl,
  addUserRegistration_ctrl,
  updateUserRegistration_ctrl,
  getUserRegistration_ctrl,
} = require("../controllers/userRegistration");
const { USER_ROLE } = require("../utils/constants");

router.post(
  "/userRegistrations",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  addUserRegistration_ctrl
);

router.put(
  "/userRegistrations/:userId",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  updateUserRegistration_ctrl
);

router.post(
  "/userRegistrations/get",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  getUserRegistration_ctrl
);

router.delete(
  "/userRegistrations",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  deleteUserRegistration_ctrl
);

router.get(
  "/dropdown/userRoles",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.CASHIER]),
  getUserRole_dropdown_ctrl
);

module.exports = router;
