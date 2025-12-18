const express = require("express");
 const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware, roleMiddleware } = require("../middlewares/auth");
const { getProducts_ctrl, inventoryOnHandReport_ctrl, getMonthlySalesDetails_ctrl, getDailySalesSummary_ctrl, getInventoryOnHand_ctrl, getLowStockReport_ctrl, getSellThroughAnalysis_ctrl } = require("../controllers/report");
const { USER_ROLE } = require("../utils/constants");


router.get(
  '/reports/getProducts',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProducts_ctrl
);

router.get(
  '/reports/inventoryOnHandReport',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  inventoryOnHandReport_ctrl
);

router.get(
  '/reports/getMonthlySalesDetails',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getMonthlySalesDetails_ctrl
);

router.get(
  '/reports/getDailySalesSummary',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getDailySalesSummary_ctrl
);


router.get(
  '/reports/getInventoryOnHand',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  getInventoryOnHand_ctrl
);

router.get(
  '/reports/getLowStockReport',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  getLowStockReport_ctrl
);

router.get(
  '/reports/getSellThroughAnalysis',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  getSellThroughAnalysis_ctrl
);

module.exports = router;
