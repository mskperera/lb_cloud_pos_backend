const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, roleMiddleware } = require('../middlewares/auth');
const {  getRegistermMenuProductCategory, getCategory_dropdown, getProductCategories, addCategory, deleteCategory, updateCategory } = require('../controllers/category');
const { USER_ROLE } = require('../utils/constants');


router.post(
  '/register/menu/category',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getRegistermMenuProductCategory
);
router.get(
  '/categories/dropdown',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getCategory_dropdown
);

router.post(
  '/categories/get',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductCategories
);

router.post(
  '/categories',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  addCategory
);

router.put(
  '/categories/:categoryId',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  updateCategory
);

router.delete(
  "/categories/:categoryId",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  deleteCategory
);

module.exports = router;
