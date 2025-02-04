const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const { getMeasurementUnit_dropdown, getMeasurementUnits, addmeasurementUnit, updatemeasurementUnit, deletemeasurementUnit } = require('../controllers/measurementUnit');


router.get(
  '/measurementUnits/dropdown',
  setTenant,
  requireSignin,
  authMiddleware,
  getMeasurementUnit_dropdown
);

router.post(
  '/measurementUnits/get',
  setTenant,
  requireSignin,
  authMiddleware,
  getMeasurementUnits
);

router.post(
  '/measurementUnits',
  setTenant,
  requireSignin,
  authMiddleware,
  addmeasurementUnit
);

router.put(
  '/measurementUnits/:measurementUnitId',
  setTenant,
  requireSignin,
  authMiddleware,
  updatemeasurementUnit
);

router.delete(
  "/measurementUnits/:measurementUnitId",
  setTenant,
  requireSignin,
  authMiddleware,
  deletemeasurementUnit
);

module.exports = router;
