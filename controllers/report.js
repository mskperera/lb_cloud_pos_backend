
const { reports_getProducts_sql, reports_getInventoryStockLevel_sql, reports_getMonthlySalesDetails_sql, reports_getDailySalesDetails_sql } = require("../sql/report");


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

exports.getInventoryStockLevel_ctrl = async (req, res) => {
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
    const result = await reports_getInventoryStockLevel_sql(
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

exports.getDailySalesDetails_ctrl = async (req, res) => {
  const {
    storeId,sessionId,utcOffset
  } = req.query;

  const tenant = req.tenant;

  if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }
  if (!sessionId) {
    return {
      error: {message:"sessionId is Required"},
    }
  }
  if (!utcOffset) {
    return {
      error: {message:"utcOffset is Required"},
    }
  }

  try {
    const result = await reports_getDailySalesDetails_sql(
      tenant,
      storeId,
      sessionId,utcOffset
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

  if (!storeId) {
    return {
      error: {message:"storeId is Required"},
    }
  }
  if (!year) {
    return {
      error: {message:"year is Required"},
    }
  }
  if (!month) {
    return {
      error: {message:"month is Required"},
    }
  }

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
