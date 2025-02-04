const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin,authMiddleware } = require('../middlewares/auth');
const {  getRegistermMenuProductCategory, getCategory_dropdown, getProductCategories, addCategory, deleteCategory, updateCategory } = require('../controllers/category');
const { getDashboardDetails } = require('../controllers/dashboard');



router.post(
  '/dashboard',
  setTenant,
  requireSignin,
  authMiddleware,
  getDashboardDetails
);


module.exports = router;
