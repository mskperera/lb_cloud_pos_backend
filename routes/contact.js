const express = require("express");
 const router = express.Router();
const {  selectContact, deleteContact, addContact, updateContact, getContactType_dropdown, 
  getSupplier_dropdown, getCustomer_dropdown } = require("../controllers/contact");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

 router.post("/contacts/getContacts",setTenant, selectContact);

router.post("/contacts/add",setTenant, addContact);
router.put("/contacts/update/:contactId", setTenant,  requireSignin,
authMiddleware,updateContact);

router.delete(
  "/contacts/delete",
  setTenant,
  requireSignin,
  authMiddleware,
  deleteContact
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
