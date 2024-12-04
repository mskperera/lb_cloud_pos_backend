const { sendPrint } = require("../services/socketIo");

exports.sendPrint_ctrl = async (req, res) => {
  try {
    const { payload, printer, printDeskId } = req.body;

    const result = await sendPrint(printDeskId, printer, payload);
    res.json({ data: result });
  } catch (err) {
    console.error("Error in sendPrint_ctrl:", err);
    res.status(400).json({
      error: err.message || "An error occurred while processing the request",
    });
  }
};
