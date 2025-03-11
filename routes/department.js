const express = require('express');
const router = express.Router();

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, roleMiddleware } = require('../middlewares/auth');
const { getDepartment_dropdown } = require('../controllers/department');
const { USER_ROLE } = require('../utils/constants');


router.get(
  '/dropdown/getDepartments',
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getDepartment_dropdown
);

module.exports = router;
