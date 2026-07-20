const { paid_in_out_insert_update_sql } = require("../sql/paidInOut");
const validator = require('validator');

exports.paidInOutAdd_srv = async (tenant, tableId, description, transactionType, amount,sessionId, userLogId) => {
  const errors = [];
  if (!description) errors.push("Description is Required");
  if (!transactionType) errors.push("Transaction Type is Required");
  if (!amount || isNaN(amount)) errors.push("Valid Numeric Amount is Required");

  if (errors.length > 0) return { error: { message: errors.join(", ") } };

  description = validator.escape(description.trim());
  const utcOffset = '5:30';
  const pageName = 'paidInOut';
  const isConfirm = false;

  try {
    return await paid_in_out_insert_update_sql(tenant, tableId, description, transactionType, amount, sessionId, "I", userLogId, utcOffset, pageName, isConfirm);
  } catch (error) { throw error; }
};

exports.paidInOutUpdate_srv = async (tenant, tableId, description, transactionType, amount, sessionId, userLogId) => {
  if (!tableId) return { error: { message: "Table ID is Required for update" } };
  
  description = validator.escape(description.trim());
  const utcOffset = '5:30';
  const pageName = 'paidInOut';
  const isConfirm = false;

  try {
    return await paid_in_out_insert_update_sql(tenant, tableId, description, transactionType, amount, sessionId, "U", userLogId, utcOffset, pageName, isConfirm);
  } catch (error) { throw error; }
};