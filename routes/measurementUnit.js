const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, roleMiddleware } = require('../middlewares/auth');
const { getMeasurementUnit_dropdown, getMeasurementUnits, addmeasurementUnit, updatemeasurementUnit, deletemeasurementUnit } = require('../controllers/measurementUnit');
const { USER_ROLE } = require('../utils/constants');


router.get(
  '/measurementUnits/dropdown',
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getMeasurementUnit_dropdown
);

router.post(
  '/measurementUnits/get',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getMeasurementUnits
);

router.post(
  '/measurementUnits',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  addmeasurementUnit
);

router.put(
  '/measurementUnits/:measurementUnitId',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  updatemeasurementUnit
);

router.delete(
  "/measurementUnits/:measurementUnitId",
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  deletemeasurementUnit
);

module.exports = router;
