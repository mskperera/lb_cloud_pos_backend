const express = require("express");
const router = express.Router();
const {orderAdd, orderSelect, getOrderReceiptByOrderId, 
  voidOrderByOrderId, getOrderVoidingReason_dropdown, getOrderFull_ctrl} = require("../controllers/order");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const { stockAdd, getStockEntries } = require("../controllers/stockEntry");

router.post(
  "/stock/stockAdd",
  setTenant,
  requireSignin,
  authMiddleware,
  stockAdd
);

router.post(
  '/stock/stockEntries',
  setTenant,
  requireSignin,
  authMiddleware,
  getStockEntries
);

router.get(
  '/order/getReceipt/:orderId',
  setTenant,
  requireSignin,
  authMiddleware,
  getOrderReceiptByOrderId
);

router.get(
  '/order/getReceiptExt/:orderId',
  setTenant,

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


module.exports = router;
