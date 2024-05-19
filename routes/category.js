const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin,authMiddleware } = require('../middlewares/auth');
const {  getRegistermMenuProductCategory, getCategory_dropdown } = require('../controllers/category');


router.post(
  '/register/menu/category',
  setTenant,
  requireSignin,
  authMiddleware,
  getRegistermMenuProductCategory
);
router.get(
  '/dropdown/getCategories',
  setTenant,
  requireSignin,
  authMiddleware,
  getCategory_dropdown
);

module.exports = router;
