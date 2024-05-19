const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const { getMeasurementUnit_dropdown } = require('../controllers/measurementUnit');
const { getDepartment_dropdown } = require('../controllers/department');


router.get(
  '/dropdown/getDepartments',
  setTenant,
  requireSignin,
  authMiddleware,
  getDepartment_dropdown
);

module.exports = router;
