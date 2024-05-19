const express = require("express");
const router = express.Router();
const {orderAdd, orderSelect, getOrderReceiptByOrderId, voidOrderByOrderId, getOrderVoidingReason_dropdown, getOrderFull_ctrl, checkNewOrderReciptAvailability_ctrl} = require("../controllers/order");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

router.post(
  "/order/orderAdd",
  setTenant,
  requireSignin,
  authMiddleware,
  orderAdd
);

router.post(
  '/order/getOrders',
  setTenant,
  requireSignin,
  authMiddleware,
  orderSelect
);

router.get(
  '/order/getReceipt/:orderId',
  setTenant,
  requireSignin,
  authMiddleware,
  getOrderReceiptByOrderId
);

router.post(
  '/order/voidOrder',
  setTenant,
  requireSignin,
  authMiddleware,
  voidOrderByOrderId
);

router.get(
  '/dropdown/getOrderVoidingReason_dropdown',
  setTenant,
  requireSignin,
  authMiddleware,
  getOrderVoidingReason_dropdown
);

router.post(
  '/order/getOrderFull',
  setTenant,
  requireSignin,
  authMiddleware,
  getOrderFull_ctrl
);

router.get(
  '/order/checkNewOrderReciptAvailability',
  setTenant,
  requireSignin,
  authMiddleware,
  checkNewOrderReciptAvailability_ctrl
);

module.exports = router;
