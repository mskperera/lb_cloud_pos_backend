
const { reports_getProducts_sql, reports_inventoryOnHandReport_sql, reports_getMonthlySalesDetails_sql, reports_getDailySalesSummary_sql, reports_getInventoryOnHand_sql, reports_getLowStockReport_sql, reports_getSellThroughAnalysis_sql } = require("../sql/report");


exports.getProducts_ctrl = async (req, res) => {
  const {
    storeId
  } = req.query;

  const tenant = req.tenant;

  if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }

  try {
    const result = await reports_getProducts_sql(
      tenant,
      storeId
    );

    res.status(200).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.inventoryOnHandReport_ctrl = async (req, res) => {
  const {
    storeId
  } = req.query;

  const tenant = req.tenant;

  if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }

  try {
    const result = await reports_inventoryOnHandReport_sql(
      tenant,
      storeId
    );

    res.status(200).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};



exports.getMonthlySalesDetails_ctrl = async (req, res) => {
  const {
    storeId,year,month
  } = req.query;

  const tenant = req.tenant;



  try {
    const result = await reports_getMonthlySalesDetails_sql(
      tenant,
      storeId,year,month
    );






    res.status(200).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};


exports.getDailySalesSummary_ctrl = async (req, res) => {
  const {
    storeId,startDate,endDate
  } = req.query;

 
  console.log('geeetttttt****',startDate,endDate)
  const tenant = req.tenant;
 




  try {
    
    const result = await reports_getDailySalesSummary_sql(
      tenant,
      storeId,startDate,endDate
    );

    if(result.error){
    return res.status(400).json({
      error: result.error
    });
  }


    res.status(200).json(result);
  } catch (err) {
      console.log("oooooooooooooooooooooooooiiioioioi: ");
    
   console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name, // include other properties if needed
        stack: err.stack,
      },
    });
  }
};

exports.getInventoryOnHand_ctrl = async (req, res) => {
  const { storeId } = req.query;
  const tenant = req.tenant;

  try {
    const result = await reports_getInventoryOnHand_sql(tenant, storeId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error in getInventoryOnHand_ctrl:', err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};

exports.getLowStockReport_ctrl = async (req, res) => {
  const { storeId } = req.query;
  const tenant = req.tenant;

  try {
    const result = await reports_getLowStockReport_sql(tenant, storeId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error in getInventoryOnHand_ctrl:', err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};


exports.getSellThroughAnalysis_ctrl = async (req, res) => {
  const { storeId, year, month } = req.query;
  const tenant = req.tenant;

  try {
    const result = await reports_getSellThroughAnalysis_sql(tenant, storeId, year, month);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error in getSellThroughAnalysis_ctrl:', err);
    return res.status(400).json({
      error: { message: err.message },
    });
  }
};