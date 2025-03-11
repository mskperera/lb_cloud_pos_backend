const express = require("express");
const router = express.Router();
const {orderAdd, orderSelect, getOrderReceiptByOrderId, voidOrderByOrderId, getOrderVoidingReason_dropdown, getOrderFull_ctrl} = require("../controllers/order");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");

router.post(
  "/order/orderAdd",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  orderAdd
);

router.post(
  '/order/getOrders',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  orderSelect
);

router.get(
  '/order/getReceipt/:orderId',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getOrderReceiptByOrderId
);

router.get(
  '/order/getReceiptExt/:orderId',
  setTenant,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getOrderReceiptByOrderId
);


router.post(
  '/order/voidOrder',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  voidOrderByOrderId
);

router.get(
  '/dropdown/getOrderVoidingReason_dropdown',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getOrderVoidingReason_dropdown
);

router.post(
  '/order/getOrderFull',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getOrderFull_ctrl
);


module.exports = router;
