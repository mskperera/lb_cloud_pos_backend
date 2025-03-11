const express = require("express");
 const router = express.Router();
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware, roleMiddleware } = require("../middlewares/auth");
const { getProducts_ctrl, getInventoryStockLevel_ctrl, getSalesDetails_ctrl, getMonthlySalesDetails_ctrl, getDailySalesDetails_ctrl } = require("../controllers/report");
const { USER_ROLE } = require("../utils/constants");


router.get(
  '/reports/getProducts',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProducts_ctrl
);

router.get(
  '/reports/getInventoryStockLevel',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getInventoryStockLevel_ctrl
);

router.get(
  '/reports/getDailySalesDetails',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getDailySalesDetails_ctrl
);

router.get(
  '/reports/getMonthlySalesDetails',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getMonthlySalesDetails_ctrl
);



module.exports = router;
