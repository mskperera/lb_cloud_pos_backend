const express = require("express");
 const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const { getProducts_ctrl, getInventoryStockLevel_ctrl, getSalesDetails_ctrl, getMonthlySalesDetails_ctrl, getDailySalesDetails_ctrl } = require("../controllers/report");


router.get(
  '/reports/getProducts',
  setTenant,
  requireSignin,
  authMiddleware,
  getProducts_ctrl
);

router.get(
  '/reports/getInventoryStockLevel',
  setTenant,
  requireSignin,
  authMiddleware,
  getInventoryStockLevel_ctrl
);

router.get(
  '/reports/getDailySalesDetails',
  setTenant,
  requireSignin,
  authMiddleware,
  getDailySalesDetails_ctrl
);

router.get(
  '/reports/getMonthlySalesDetails',
  setTenant,
  requireSignin,
  authMiddleware,
  getMonthlySalesDetails_ctrl
);



module.exports = router;
