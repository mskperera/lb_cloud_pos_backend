const express = require("express");
 const router = express.Router();

const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const {  deleteUserRegistration_ctrl, getUserRole_dropdown_ctrl, addUserRegistration_ctrl, updateUserRegistration_ctrl, getUserRegistration_ctrl } = require("../controllers/userRegistration");

router.post("/userRegistrations",setTenant,requireSignin,authMiddleware, addUserRegistration_ctrl);
router.put("/userRegistrations/:userId", setTenant,  requireSignin,authMiddleware,updateUserRegistration_ctrl);
router.post("/userRegistrations/get",setTenant,requireSignin,authMiddleware, getUserRegistration_ctrl);

router.delete(
  '/userRegistrations',
  setTenant,
  requireSignin,
  authMiddleware,
  deleteUserRegistration_ctrl
);

router.get(
  '/dropdown/userRoles',
  setTenant,
  requireSignin,
  authMiddleware,
  getUserRole_dropdown_ctrl
);


module.exports = router;
