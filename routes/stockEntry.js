const express = require("express");
const router = express.Router();
const {orderAdd, orderSelect, getOrderReceiptByOrderId, 
  voidOrderByOrderId, getOrderVoidingReason_dropdown, getOrderFull_ctrl} = require("../controllers/order");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const { stockAdd, getStockEntries, getStockEntryFullbyStockEntryId, stockEntryVoid, getStockEntryVoidingReason_dropdown, getStockInfo_ctrl, stockAdjust_ctrl, getStockAdjustments_ctrl, getAdjustmentReasons_dropdown_ctrl, update_price_cost_ctrl, getPriceChange_ctrl, releaseStockBatch_ctrl, getInventoryTransactionHistory_ctrl } = require("../controllers/stockEntry");

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
  '/stock/getStockEntryFull',
  setTenant,
  requireSignin,
  authMiddleware,
  getStockEntryFullbyStockEntryId
);

router.get(
  '/stock/stockEntry_void',
  setTenant,
  requireSignin,
  authMiddleware,
  stockEntryVoid
);

router.get(
  '/dropdown/getDrpdownStockEntryVoidingReason',
  setTenant,
  requireSignin,
  authMiddleware,
  getStockEntryVoidingReason_dropdown
);

router.get(
  '/stock/getStockInfo',
  setTenant,
  requireSignin,
  authMiddleware,
  getStockInfo_ctrl
);

router.post(
  '/stock/stockAdjust',
  setTenant,
  requireSignin,
  authMiddleware,
  stockAdjust_ctrl
);

router.get(
  '/stock/getStockAdjustments',
  setTenant,
  requireSignin,
  authMiddleware,
  getStockAdjustments_ctrl
);

router.get(
  `/dropdown/getAdjustmentReasons`,
  setTenant,
  requireSignin,
  authMiddleware,
  getAdjustmentReasons_dropdown_ctrl
);

router.post(
  '/stock/updatePriceCost',
  setTenant,
  requireSignin,
  authMiddleware,
  update_price_cost_ctrl
);

router.get(
  `/stock/getPriceChange`,
  setTenant,
  requireSignin,
  authMiddleware,
  getPriceChange_ctrl
);

router.post(
  '/stock/releaseStockBatch',
  setTenant,
  requireSignin,
  authMiddleware,
  releaseStockBatch_ctrl
);



router.post(
  '/stock/getInventoryTransactionHistory',
  setTenant,
  requireSignin,
  authMiddleware,
  getInventoryTransactionHistory_ctrl
);


module.exports = router;
