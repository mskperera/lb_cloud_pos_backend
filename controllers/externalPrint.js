const { order_Insert, order_select, OrderReceipt_SelectByOrderId, voidOrder_By_OrderId, drp_order_voiding_reason_select, OrderFull_Select, checkNewOrderReciptAvailability_sql, clearPrintingData_sql } = require('../sql/order');


exports.checkNewOrderReciptAvailability_ctrl =async (req, res) => {

  const {terminalId } = req.params;
 
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;


  try {

  const result= await checkNewOrderReciptAvailability_sql(tenant,terminalId);

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


exports.clearPrintingData_ctrl =async (req, res) => {

  const {terminalId } = req.query;
 
  const tenant=req.tenant;


  try {

  const result= await clearPrintingData_sql(tenant,terminalId);

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

