const express = require("express");
const router = express.Router();
const { addPaidInOut_ctrl, updatePaidInOut_ctrl, selectPaidInOut_ctrl, deletePaidInOut_ctrl } = require("../controllers/paidInOut");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");

const allowedRoles = [USER_ROLE.ADMIN, USER_ROLE.MANAGER];

router.post("/paid-in-out/get", setTenant, requireSignin, roleMiddleware([...allowedRoles, USER_ROLE.CASHIER]), selectPaidInOut_ctrl);
router.post("/paid-in-out", setTenant, requireSignin, roleMiddleware(allowedRoles), addPaidInOut_ctrl);
router.put("/paid-in-out/:id", setTenant, requireSignin, roleMiddleware(allowedRoles), updatePaidInOut_ctrl);
router.delete("/paid-in-out", setTenant, requireSignin, roleMiddleware(allowedRoles), deletePaidInOut_ctrl);

module.exports = router;