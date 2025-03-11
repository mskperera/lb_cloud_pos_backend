const { voidOrder_By_OrderId, OrderFull_Select } = require('../sql/order');
const { stockEntry_Insert, stockEntry_Select, stockEntry_full_Select, stockEntry_void, drp_stockEntry_voiding_reason_select, getStockInfo_sql, stock_adjust_sql, get_stock_adjustments_sql, drp_adjustmentReasons_select_sql, update_price_cost_sql, get_price_change_log_sql, releaseStockBatch_sql, get_inventory_transation_history_sql } = require('../sql/stockEntry');

exports.stockAdd = async (req, res) => {
  const {
    supplierId,
    storeId,
    stockReceivedDate,
    amountPaid,
    remark,
    supplierBillNo,
    orderList,
    isConfirm
  } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {

    if (!storeId) {
      return res.status(422).json({
        error: {message:"storeId is Required"},
      });
    }
    if (!stockReceivedDate) {
      return res.status(422).json({
        error: {message:"stockReceivedDate is Required"},
      });
    }

    if (!amountPaid) {
      return res.status(422).json({
        error: {message:"amountPaid is Required"},
      });
    }

    // if (!remark) {
    //   return res.status(422).json({
    //     error: {message:"remark is Required"},
    //   });
    // }

    if (!orderList || !orderList[0]) {
      return res.status(422).json({
        error: {message:"orderList can not be empty"},
      });
    }

    if (!utcOffset) {
      return res.status(422).json({
        error: {message:"utcOffset is Required"},
      });
    }

    if (!userLogId) {
      return res.status(422).json({
        error: {message:"userLogId is Required"},
      });
    }
    
  const result=await stockEntry_Insert(tenant, supplierId,
    storeId,
    stockReceivedDate,
    amountPaid,
    remark,
    supplierBillNo,
    orderList,
    userLogId,
    utcOffset,
    pageName,
    isConfirm)

    res.status(201).json(result);
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


exports.getStockEntries =async (req, res) => {

  const {stockEntryId,  storeId, stockEntryRefNo, fromDate, toDate, supplierId, supplierCode,
        suppliertName, skip, limit } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await stockEntry_Select( tenant,
    stockEntryId,  storeId, stockEntryRefNo, fromDate, toDate,
        supplierId, supplierCode, suppliertName,
        skip, limit, userLogId, utcOffset, pageName);

      res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });
}
};

exports.getStockEntryFullbyStockEntryId =async (req, res) => {

  const {stockEntryId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await stockEntry_full_Select(tenant,stockEntryId,userLogId);

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



exports.getStockEntryVoidingReason_dropdown =async (req, res) => {

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await drp_stockEntry_voiding_reason_select(tenant, userLogId,utcOffset,pageName);

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


exports.getOrderFull_ctrl =async (req, res) => {

  const {orderId,orderNo } = req.body;
 
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;
  console.log('orderId,orderId',orderId)


  try {

 
 


  const result= await OrderFull_Select(tenant,orderId,orderNo, userLogId);

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


exports.stockEntryVoid =async (req, res) => {

  const {stockEntryId,voidingReasonId } = req.query;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';


  try {
    
    if (!stockEntryId) {
      return res.status(422).json({
        error: {message:"stockEntryId is Required"},
      });
    }
    if (!voidingReasonId) {
      return res.status(422).json({
        error: {message:"voidingReasonId is Required"},
      });
    }

  const result= await stockEntry_void(tenant,
    stockEntryId,voidingReasonId,
    userLogId,
    utcOffset,
    pageName);
    
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

exports.getStockInfo_ctrl =async (req, res) => {

  const {inventoryId,showZeroStockQtyData } = req.query;
 
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;

const showZeroStockQtyDataBool=showZeroStockQtyData==="true"?true:false;

  console.log('showZeroStockQtyData',showZeroStockQtyDataBool)


  try {

  const result= await getStockInfo_sql(tenant,inventoryId,showZeroStockQtyDataBool);

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


exports.stockAdjust_ctrl =async (req, res) => {

  const {
    stockBatchId,
    adjustedQty,
    adjustmentTypeId,
    adjustmentReasonId,
    adjustmentReasonOtherRemark } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';


  try {
    
    if (!stockBatchId) {
      return res.status(422).json({
        error: {message:"stockBatchId is Required"},
      });
    }
    if (!adjustedQty) {
      return res.status(422).json({
        error: {message:"adjustedQty is Required"},
      });
    }
    if (!adjustmentTypeId) {
      return res.status(422).json({
        error: {message:"adjustmentTypeId is Required"},
      });
    }
    if (!adjustmentReasonId) {
      return res.status(422).json({
        error: {message:"adjustmentReasonId is Required"},
      });
    }

  const result= await stock_adjust_sql(
    tenant,
    stockBatchId,
    adjustedQty,
    adjustmentTypeId,
    adjustmentReasonId,
    adjustmentReasonOtherRemark,
    userLogId,
    utcOffset,
    pageName
  );
    
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



exports.getStockAdjustments_ctrl =async (req, res) => {

  const {
    stockBatchId } = req.query;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';


  try {
    
    if (!stockBatchId) {
      return res.status(422).json({
        error: {message:"stockBatchId is Required"},
      });
    }


  const result= await get_stock_adjustments_sql(
    tenant,
    stockBatchId,
    userLogId,
    utcOffset,
    pageName
  );
    
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


exports.getAdjustmentReasons_dropdown_ctrl =async (req, res) => {

  const {adjustmentTypeId } = req.query;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await drp_adjustmentReasons_select_sql(tenant, adjustmentTypeId);

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

exports.update_price_cost_ctrl =async (req, res) => {

  const {
    stockBatchId,
    newUnitPrice,
    newUnitCost,
    changeReason
   } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';


  try {
    
    if (!stockBatchId) {
      return res.status(422).json({
        error: {message:"stockBatchId is Required"},
      });
    }
    if (!newUnitPrice) {
      return res.status(422).json({
        error: {message:"newUnitPrice is Required"},
      });
    }
    if (!newUnitCost) {
      return res.status(422).json({
        error: {message:"newUnitCost is Required"},
      });
    }

    if (!changeReason) {
      return res.status(422).json({
        error: {message:"changeReason is Required"},
      });
    }

  const result= await update_price_cost_sql(
    tenant,
    stockBatchId,
    newUnitPrice,
    newUnitCost,
    changeReason,
    userLogId,
    utcOffset,
    pageName
  );
    
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

exports.getPriceChange_ctrl =async (req, res) => {

  const {
    stockBatchId } = req.query;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';


  try {
    
    if (!stockBatchId) {
      return res.status(422).json({
        error: {message:"stockBatchId is Required"},
      });
    }


  const result= await get_price_change_log_sql(
    tenant,
    stockBatchId,
    userLogId,
    utcOffset,
    pageName
  );
    
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


exports.releaseStockBatch_ctrl =async (req, res) => {

  const {
    stockBatchId,
    stopRelease
   } = req.body;

  const tenant=req.tenant;
  try {
    
    if (!stockBatchId) {
      return res.status(422).json({
        error: {message:"stockBatchId is Required"},
      });
    }

    if (stopRelease===null || stopRelease==="") {
      return res.status(422).json({
        error: {message:"stopRelease status is Required"},
      });
    }

  const result= await releaseStockBatch_sql(
    tenant,
    stockBatchId,
    stopRelease
  );
    
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


exports.getInventoryTransactionHistory_ctrl =async (req, res) => {
  // console.log('products_Select',req.body);
  const {inventoryId,storeId,limit,skip } = req.body;
  const tenant=req.tenant;

  try {
  const result= await get_inventory_transation_history_sql(tenant,inventoryId,storeId,skip,limit);
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
