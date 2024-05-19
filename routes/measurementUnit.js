const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const { getMeasurementUnit_dropdown } = require('../controllers/measurementUnit');


router.get(
  '/dropdown/getMeasurementUnits',
  setTenant,
  requireSignin,
  authMiddleware,
  getMeasurementUnit_dropdown
);

module.exports = router;
