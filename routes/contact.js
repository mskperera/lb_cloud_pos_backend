const express = require("express");
 const router = express.Router();
const {  selectContact, deleteContact, getContactType_dropdown, 
  getSupplier_dropdown, getCustomer_dropdown, 
  addContact_ctrl,
  updateContact_ctrl} = require("../controllers/contact");
const { setTenant } = require("../middlewares/tenancyManage");
const { requireSignin, authMiddleware } = require("../middlewares/auth");

 router.post("/contacts/getContacts",setTenant,requireSignin,authMiddleware, selectContact);

router.post("/contacts",setTenant,requireSignin,authMiddleware, addContact_ctrl);
router.put("/contacts/:contactId", setTenant,  requireSignin,authMiddleware,updateContact_ctrl);

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
