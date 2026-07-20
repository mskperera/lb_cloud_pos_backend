const { paidInOutAdd_srv, paidInOutUpdate_srv } = require('../services/paidInOut');
const { paid_in_out_select_sql, paid_in_out_delete_sql } = require("../sql/paidInOut");

exports.addPaidInOut_ctrl = async (req, res) => {
  const { description, transactionType, amount, sessionId } = req.body;
  try {
    const result = await paidInOutAdd_srv(req.tenant, null, description, transactionType, amount,sessionId, req.authUser.userLogId);
    if (result.error) return res.status(422).json({ error: result.error });
    res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
};

exports.updatePaidInOut_ctrl = async (req, res) => {
  const { id } = req.params;
  const { description, transactionType, amount,sessionId } = req.body;
  try {
    const result = await paidInOutUpdate_srv(req.tenant, id, description, transactionType, amount,sessionId, req.authUser.userLogId);
    if (result.error) return res.status(422).json({ error: result.error });
    res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
};

exports.selectPaidInOut_ctrl = async (req, res) => {
  const { paidInOutId, transactionType, description,sessionId, skip, limit } = req.body;
  try {
    const result = await paid_in_out_select_sql(req.tenant, paidInOutId, transactionType, description,sessionId, skip, limit, 1, "5:30", "p");
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
};

exports.deletePaidInOut_ctrl = async (req, res) => {
  const { id, isConfirm } = req.query;
  try {
    const result = await paid_in_out_delete_sql(req.tenant, id, 1, "5:30", "p", JSON.parse(isConfirm));
    res.json(result);
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
};