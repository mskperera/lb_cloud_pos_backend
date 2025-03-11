const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const { getMeasurementUnit_dropdown } = require('../controllers/measurementUnit');
const { getBrands_dropdown } = require('../controllers/brands');



router.get(
  '/dropdown/getBrands',
  setTenant,
  requireSignin,
  authMiddleware,
  getBrands_dropdown
);

module.exports = router;
