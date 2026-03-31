const express = require("express");
const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");
const { transferOrderAdd_ctrl, transferOrderUpdate_ctrl, getTransferOrders_ctrl, getTransferOrderById_ctrl } = require("../controllers/transferOrder");

router.post(
  "/transferOrders",
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  transferOrderAdd_ctrl
);

router.put(
  "/transferOrders",
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  transferOrderUpdate_ctrl
);


router.get(
  '/transferOrders',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getTransferOrders_ctrl
);

router.get(
  '/transferOrder/getById',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getTransferOrderById_ctrl
);




module.exports = router;
