const { SP_STATUS } = require("../constants");
const {
  customer_insert_update,
  customer_select,
  customer_delete,
} = require("../sql/customer");

exports.addCustomer = async (req, res) => {
  const { tableId, customerName, email, mobile, tel, remark } =
    req.body;

  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const isConfirm = true;
  const saveType = "I";

  try {

    if (!customerName) {
      return res.status(422).json({
        error: {message:"customerName is Required"},
      });
    }

    // if (!email) {
    //   return res.status(422).json({
    //     error: {message:"email is Required"},
    //   });
    // }

    if (!mobile) {
      return res.status(422).json({
        error: {message:"mobile is Required"},
      });
    }
    // if (!tel) {
    //   return res.status(422).json({
    //     error: {message:"tel is Required"},
    //   });
    // }


    const result = await customer_insert_update(
      tenant,
      tableId,
      customerName,
      email,
      mobile,
      tel,
      remark,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );
    res.status(201).json(result);
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

exports.updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const tenant = req.tenant;
  console.log("customerid", customerId);
  const { customerName, email, mobile, tel, remark } = req.body;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const tableId = customerId;
  const saveType = "U";
  const isConfirm = true;

  try {
    const result = await customer_insert_update(
      tenant,
      tableId,
      customerName,
      email,
      mobile,
      tel,
      remark,
      saveType,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
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

exports.selectCustomer = async (req, res) => {
  const {
    customerId,
    customerCode,
    customerName,
    email,
    mobile,
    tel,
    searchByKeyword,
    skip,
    limit,
  } = req.body;
  console.log("selectCustomer req.body: ", req.body);
  const tenant = req.tenant;
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";
  const promptBeforeContinue = false;

  try {
    const result = await customer_select(
      tenant,
      customerId,
      customerCode,
      customerName,
      email,
      mobile,
      tel,
      searchByKeyword,
      skip,
      limit,
      userLogId,
      utcOffset,
      pageName,
      promptBeforeContinue
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

exports.deleteCustomer = async (req, res) => {
  const { customerId, isConfirm } = req.query;

  const tenant = req.tenant;
  const _isConfirm = JSON.parse(isConfirm);
  const utcOffset = "5:30";
  const userLogId = 1;
  const pageName = "p";

  try {
    const result = await customer_delete(
      tenant,
      customerId,
      userLogId,
      utcOffset,
      pageName,
      _isConfirm
    );
    //const { responseStatus, outputMessage } = result.outputValues;
    // if (responseStatus === SP_STATUS.failed) {
    //   return res.status(400).json({
    //     error: {
    //       message: outputMessage,
    //     },
    //   });
    // }
    // if (responseStatus === SP_STATUS.confirm) {
    //   return res.status(202).json({
    //     error: {
    //       message: outputMessage,
    //     },
    //   });
    // }

    res.json(result);
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
