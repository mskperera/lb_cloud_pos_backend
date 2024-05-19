const { product_delete, product_select_sql, product_insertUpdate_sql } = require('../sql/product');

exports.product_Add =async (req, res) => {
  const {
    tableId,
    branchId,
    companyId,
    productNo,
    isProductNoAutoGenerate,
    productName,
    categoryIdList,
    measurementUnitId,
    unitPrice,
    departmentId,
    barcode,
    reorderLevel
  } = req.body;

  console.log('req.body',req.body);
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';
  const promptBeforeContinue=false;
  //const tableId=productId;
  const saveType="I";

  try {
  const result=  await product_insertUpdate_sql(
    tenant,
      tableId,
      branchId,
      companyId,
      productNo,
     isProductNoAutoGenerate,
      productName,
      categoryIdList,
      measurementUnitId,
      unitPrice,
      departmentId,
      barcode,
      reorderLevel,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      promptBeforeContinue);

      res.json(result);
 

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};

exports.product_Update =async (req, res) => {

  const { productId } = req.params;

  const {
    branchId,
    companyId,
    productNo,
    productName,
    categoryIdList,
    measurementUnitId,
    unitPrice,
    departmentId,
    barcode,
    reorderLevel,
    isConfirm
  } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';
  const tableId=productId;
  const saveType="U";

  try {
  const result=  await product_insertUpdate_sql(
    tenant,
      tableId,
      branchId,
      companyId,
      productNo,
      false,//isProductNoAutoGenerate
      productName,
      categoryIdList,
    measurementUnitId,
      unitPrice,
      departmentId,
      barcode,
      reorderLevel,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm);

      res.json(result);
 
} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};


exports.getProducts =async (req, res) => {
  console.log('products_Select',req.body);
  const {productId,productNo, productName, barcode,categoryId,measurementUnitId,searchByKeyword,limit,skip } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await product_select_sql(tenant,productId,  productNo, productName,barcode,categoryId,measurementUnitId,searchByKeyword,
    skip,limit, userLogId,utcOffset,pageName);
   // console.log('products_Select result',result.results);
      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};


exports.product_delete =async (req, res) => {
  const { productId, isConfirm } = req.query;

  const _isConfirm = JSON.parse(isConfirm);

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';
  console.log('product_delete: ',_isConfirm)
  try {
  const result=  await product_delete(tenant,productId, userLogId,utcOffset,pageName,_isConfirm);
  res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name, // include other properties if needed
      stack: err.stack
    }
  });
}
};
