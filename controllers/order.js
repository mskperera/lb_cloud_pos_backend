const { order_Insert, order_select, OrderReceipt_SelectByOrderId, voidOrder_By_OrderId, drp_order_voiding_reason_select, OrderFull_Select, checkNewOrderReciptAvailability_sql } = require('../sql/order');

exports.orderAdd = async (req, res) => {
  const {
    customerId,terminalId,sessionId,overallDiscounts,
    orderList,paymentList,isConfirm
  } = req.body;

  const tenant=req.tenant;
  const utcOffset=req.authUser.utcOffset;
  const userLogId=req.authUser.userLogId;
  const IsStockSupported=false;
  const pageName='p';

  //visibletoEveryone,technicalReview
  try {
    // if (!customerId) {
    //   return res.status(422).json({
    //     error: {message:"customerId is Required"},
    //   });
    // }


    if (!terminalId) {
      return res.status(422).json({
        error: {message:"terminalId is Required"},
      });
    }
    if (!sessionId) {
      return res.status(422).json({
        error: {message:"sessionId is Required"},
      });
    }
    

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
    
   //const {userId,roleId,gmtOffset,userLogId}=req.authUser;

  const result=await order_Insert(tenant,customerId,terminalId,sessionId,
    overallDiscounts,
    orderList,paymentList,IsStockSupported,
    userLogId,utcOffset,pageName,isConfirm)

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


exports.orderSelect =async (req, res) => {

  const {orderId,orderNo, orderFromDate,orderToDate,customerId, customerCode,
    customerName,terminalId,sessionId,skip,limit } = req.body;
  console.log('orderFromDate: ',orderFromDate)
  console.log('orderToDate: ',orderToDate)
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await order_select(tenant,orderId,orderNo, orderFromDate,orderToDate,customerId, customerCode,
    customerName,terminalId,sessionId,
    skip,limit, userLogId,utcOffset,pageName);

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

exports.getOrderReceiptByOrderId =async (req, res) => {

  const {orderId } = req.params;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
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
   const userLogId=req.authUser.userLogId; 
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
   const userLogId=req.authUser.userLogId;
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

