const express = require('express');
const router = express.Router();
const {
  product_delete,
  product_Add,
  product_Update,
  getProducts,
  getProductTypes_drp,
  getProductExtraDetails,
  getProductAvailaleStores,
  getNonSerializedItems,
  getStores_ctrl,
  getVariationTypes_drp,
  getProductsAllVariations,
  getProductsPosMenu,
  getVariationProductDetails_ctrl
} = require('../controllers/product');

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin,authMiddleware } = require('../middlewares/auth');


router.post(
  '/product/add',
  setTenant,
 requireSignin,
 authMiddleware,
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

router.post(
  '/product/getProductsPosMenu',
  setTenant,
  requireSignin,
  authMiddleware,

  getProductsPosMenu
);

router.post(
  '/product/getVariationProductDetails',
  setTenant,
  requireSignin,
  authMiddleware,

  getVariationProductDetails_ctrl
);

router.post(
  '/product/productsAllVariations',
  setTenant,
  requireSignin,
  authMiddleware,

  getProductsAllVariations
);


router.get(
  '/dropdown/getProductTypes',
  setTenant,
  requireSignin,
  authMiddleware,
  getProductTypes_drp
);

router.get(
  '/dropdown/getVariationTypes',
  setTenant,
  requireSignin,
  authMiddleware,
  getVariationTypes_drp
);


router.get(
  '/product/products/extra',
  setTenant,
  requireSignin,
  authMiddleware,
  getProductExtraDetails
);


router.post(
  '/product/getProductAvailaleStores',
  setTenant,
  requireSignin,
  authMiddleware,
  getProductAvailaleStores
);

router.post(
  '/product/getNonSerializedItems',
  setTenant,
  requireSignin,
  authMiddleware,
  getNonSerializedItems
);


router.get(
  '/dropdown/getStores',
  setTenant,
  // requireSignin,
  // authMiddleware,
  getStores_ctrl
);

module.exports = router;


