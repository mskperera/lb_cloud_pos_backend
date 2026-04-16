const express = require("express");
const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { stockAdd, getStockEntries, getStockEntryFullbyStockEntryId, stockEntryVoid, getStockEntryVoidingReason_dropdown, getStockInfo_ctrl, stockAdjust_ctrl, getStockAdjustments_ctrl, getAdjustmentReasons_dropdown_ctrl, update_price_cost_ctrl, getPriceChange_ctrl, releaseStockBatch_ctrl, getInventoryTransactionHistory_ctrl, getStockInfoBy_allProductId_storeId_ctrl } = require("../controllers/stockEntry");
const { USER_ROLE } = require("../utils/constants");

router.post(
  "/stock/stockAdd",
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  stockAdd
);

router.post(
  '/stock/stockEntries',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStockEntries
);

router.get(
  '/stock/getStockEntryFull',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStockEntryFullbyStockEntryId
);

router.get(
  '/stock/stockEntry_void',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  stockEntryVoid
);

router.get(
  '/dropdown/getDrpdownStockEntryVoidingReason',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStockEntryVoidingReason_dropdown
);

router.get(
  '/stock/getStockInfo',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStockInfo_ctrl
);

router.post(
  '/stock/stockAdjust',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  stockAdjust_ctrl
);

router.get(
  '/stock/getStockAdjustments',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStockAdjustments_ctrl
);

router.get(
  `/dropdown/getAdjustmentReasons`,
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getAdjustmentReasons_dropdown_ctrl
);

router.post(
  '/stock/updatePriceCost',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  update_price_cost_ctrl
);

router.get(
  `/stock/getPriceChange`,
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getPriceChange_ctrl
);

router.post(
  '/stock/releaseStockBatch',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  releaseStockBatch_ctrl
);



router.post(
  '/stock/getInventoryTransactionHistory',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getInventoryTransactionHistory_ctrl
);

router.get('/stock/stockInfoBy_allProductId_storeId',
    setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
   getStockInfoBy_allProductId_storeId_ctrl);




module.exports = router;
