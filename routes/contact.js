const express = require("express");
 const router = express.Router();
const {  selectContact, deleteContact, getContactType_dropdown, 
  getSupplier_dropdown, getCustomer_dropdown, 
  addContact_ctrl,
  updateContact_ctrl} = require("../controllers/contact");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, roleMiddleware } = require("../middlewares/auth");
const { USER_ROLE } = require("../utils/constants");

 router.post("/contacts/get",setTenant,requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  selectContact);

router.post("/contacts",setTenant,requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  addContact_ctrl); // Add contact

router.put("/contacts/:contactId", setTenant,  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  updateContact_ctrl); // Update contact

router.delete(
  "/contacts",
  setTenant,requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  deleteContact
);

router.get(
  '/dropdown/getContactTypes',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getContactType_dropdown
);

router.get(
  '/dropdown/suppliers',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getSupplier_dropdown
);

router.get(
  '/dropdown/customers',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getCustomer_dropdown
);

module.exports = router;
