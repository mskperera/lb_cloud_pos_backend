

const { transferOrder_Insert_Update_sql, getTransferOrder_byId_sql,getTransferOrders_sql, transferOrder_Insert_sql, transferOrder_receive_sql } = require('../sql/transferOrder');

exports.transferOrderAdd_ctrl = async (req, res) => {
  const {
      status,
    sourceStoreId,
    destinationStoreId,
    transferDate,
    notes,
    orderList_json
  } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {

    
  const result=await transferOrder_Insert_sql(tenant,
    status,
    sourceStoreId,
    destinationStoreId,
    transferDate,
    notes,
    orderList_json,
    userLogId
  )

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


exports.transferOrderUpdate_ctrl = async (req, res) => {
  const {
    tableId,
      sourceStoreId  ,
      destinationStoreId ,
      transferDate,
     state,
    notes,
    orderList_json
  } = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {

    
  const result=await transferOrder_Insert_Update_sql( tenant,
    tableId,
      sourceStoreId ,
      destinationStoreId ,
      transferDate,
     state,
    notes,
    orderList_json,
    "U",
      userLogId,
      utcOffset,
      pageName
  )

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



exports.getTransferOrders_ctrl = async (req, res) => {
  const { 
    sourceStoreId, 
    destinationStoreId, 
    status, 
    skip, 
    limit 
  } = req.body;

  const tenant = req.tenant;

  try {
    const result = await getTransferOrders_sql(
      tenant,
      sourceStoreId,
      destinationStoreId,
      status,
      skip,
      limit
    );
    res.json(result);

  } catch (err) {
    console.error('TransferOrder List Error: ', err);
    return res.status(400).json({ 
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack
      }
    });
  }
};


exports.getTransferOrderById_ctrl = async (req, res) => {
  const { transferOrderId } = req.query;
  const tenant = req.tenant;

  try {
  
    if (!transferOrderId) {
      return res.status(400).json({ message: "transferOrderId is required" });
    }

    const result = await getTransferOrder_byId_sql(tenant, transferOrderId);
    res.json(result);

  } catch (err) {
    console.error('TransferOrder Detail Error: ', err);
    return res.status(400).json({ 
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack
      }
    });
  }
};



exports.transferOrder_receive_ctrl = async (req, res) => {
  const {transferOrderId,items} = req.body;

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {

    
  const result=await transferOrder_receive_sql( tenant,
      transferOrderId,
    items,
      userLogId,
  )

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

