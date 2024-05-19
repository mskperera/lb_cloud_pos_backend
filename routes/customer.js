const express = require("express");
 const router = express.Router();
const {  selectCustomer, deleteCustomer, addCustomer, updateCustomer } = require("../controllers/customer");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

 router.post("/customer/customers",setTenant, selectCustomer);

router.post("/customer/add",setTenant, addCustomer);
router.put("/customer/update/:customerId", setTenant,  requireSignin,
authMiddleware,updateCustomer);

router.delete(
  "/customer/delete",
  setTenant,
  requireSignin,
  authMiddleware,
  deleteCustomer
);

module.exports = router;
