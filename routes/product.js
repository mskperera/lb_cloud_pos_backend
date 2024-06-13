const express = require('express');
const router = express.Router();
const {
  product_delete,
  product_Add,
  product_Update,
  getProducts,
} = require('../controllers/product');

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin,authMiddleware } = require('../middlewares/auth');


router.post(
  '/product/add',
  setTenant,
 // requireSignin,
 // authMiddleware,
  product_Add
);

router.put(
  '/product/update/:productId',
  setTenant,
  requireSignin,
  authMiddleware,
  product_Update
);


router.delete(
  '/product/delete',
  setTenant,
  requireSignin,
  authMiddleware,
  product_delete
);

router.post(
  '/product/products',
  setTenant,
  requireSignin,
  authMiddleware,

  getProducts
);



module.exports = router;
