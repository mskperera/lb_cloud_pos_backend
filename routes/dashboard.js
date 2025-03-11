const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, roleMiddleware } = require('../middlewares/auth');
const { getDashboardDetails } = require('../controllers/dashboard');
const { USER_ROLE } = require('../utils/constants');



router.post(
  '/dashboard',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getDashboardDetails
);


module.exports = router;
