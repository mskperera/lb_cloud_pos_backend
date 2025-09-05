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
  getVariationProductDetails_ctrl,
  getProductDetailsByInventoryId,
  getSubProductListOfAssemblyProduct_ctrl
} = require('../controllers/product');

const { setTenant } = require('../middlewares/tenancyManage');
const { requireSignin, roleMiddleware} = require('../middlewares/auth');
const { USER_ROLE } = require('../utils/constants');


router.post(
  '/products',
  setTenant,
 requireSignin,
 roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  product_Add
); // Add Product

router.put(
  '/products/:productId',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  product_Update
); // Update Product


router.delete(
  '/products',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER]),
  product_delete
);

router.post(
  '/products/get',
  setTenant,
  requireSignin,
   roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProducts
); // Search Products

router.post(
  '/product/getProductsPosMenu',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductsPosMenu
);

router.post(
  '/product/getVariationProductDetails',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getVariationProductDetails_ctrl
);

router.post(
  '/product/productsAllVariations',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductsAllVariations
);


router.get(
  '/dropdown/productTypes',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductTypes_drp
);

router.get(
  '/dropdown/getVariationTypes',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getVariationTypes_drp
);


router.get(
  '/product/products/extra',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductExtraDetails
);

router.get(
  '/product/sub-products',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getSubProductListOfAssemblyProduct_ctrl
);

router.post(
  '/product/getProductAvailaleStores',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductAvailaleStores
);

router.post(
  '/product/getNonSerializedItems',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getNonSerializedItems
);


router.get(
  '/dropdown/getStores',
  setTenant,
   requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getStores_ctrl
);


router.get(
  '/product/productDetailsByInventoryId',
  setTenant,
  requireSignin,
  roleMiddleware([USER_ROLE.ADMIN, USER_ROLE.MANAGER,USER_ROLE.CASHIER]),
  getProductDetailsByInventoryId
);





module.exports = router;


