const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin,authMiddleware } = require('../middlewares/auth');
const {  getRegistermMenuProductCategory, getCategory_dropdown, getProductCategories, addCategory, deleteCategory, updateCategory } = require('../controllers/category');


router.post(
  '/register/menu/category',
  setTenant,
  requireSignin,
  authMiddleware,
  getRegistermMenuProductCategory
);
router.get(
  '/categories/dropdown',
  setTenant,
  requireSignin,
  authMiddleware,
  getCategory_dropdown
);

router.post(
  '/categories/get',
  setTenant,
  requireSignin,
  authMiddleware,
  getProductCategories
);

router.post(
  '/categories',
  setTenant,
  requireSignin,
  authMiddleware,
  addCategory
);

router.put(
  '/categories/:categoryId',
  setTenant,
  requireSignin,
  authMiddleware,
  updateCategory
);

router.delete(
  "/categories/:categoryId",
  setTenant,
  requireSignin,
  authMiddleware,
  deleteCategory
);


module.exports = router;
