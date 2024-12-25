const express = require("express");
 const router = express.Router();
const {  selectCustomer, deleteCustomer, addCustomer, updateCustomer, getContactType_dropdown, 
  getSupplier_dropdown, getCustomer_dropdown } = require("../controllers/customer");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

 router.post("/customer/customers",setTenant, selectCustomer);

router.post("/customer/add",setTenant, addCustomer);
router.put("/customer/update/:contactId", setTenant,  requireSignin,
authMiddleware,updateCustomer);

router.delete(
  "/customer/delete",
  setTenant,
  requireSignin,
  authMiddleware,
  deleteCustomer
);

router.get(
  '/dropdown/getContactTypes',
  setTenant,
  requireSignin,
  authMiddleware,
  getContactType_dropdown
);

router.get(
  '/dropdown/suppliers',
  setTenant,
  requireSignin,
  authMiddleware,
  getSupplier_dropdown
);

router.get(
  '/dropdown/customers',
  setTenant,
  requireSignin,
  authMiddleware,
  getCustomer_dropdown
);




module.exports = router;
