const { order_Insert, order_select, OrderReceipt_SelectByOrderId, voidOrder_By_OrderId, drp_order_voiding_reason_select, OrderFull_Select, checkNewOrderReciptAvailability_sql } = require('../sql/order');
const { stockEntry_Insert, stockEntry_Select } = require('../sql/stockEntry');

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
  const userLogId=1;
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
  const userLogId=1;
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

exports.getOrderReceiptByOrderId =async (req, res) => {

  const {orderId } = req.params;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await OrderReceipt_SelectByOrderId(tenant,orderId,
    userLogId,utcOffset,pageName);

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

exports.voidOrderByOrderId =async (req, res) => {

  const {orderId,reasonId,isConfirm } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
    
    if (!orderId) {
      return res.status(422).json({
        error: {message:"orderId is Required"},
      });
    }

    console.log('reson',reasonId)

    if (!reasonId) {
      return res.status(422).json({
        error: {message:"reason is Required"},
      });
    }

  const result= await voidOrder_By_OrderId(tenant,orderId,reasonId,
    userLogId,utcOffset,pageName,isConfirm);

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



exports.getOrderVoidingReason_dropdown =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_order_voiding_reason_select(tenant, userLogId,utcOffset,pageName);

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
  const userLogId=1;
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

