const express = require("express");
const router = express.Router();
const { sendPrint_ctrl } = require("../controllers/socketIoPrint");
    

router.post("/socket/sendPrint", sendPrint_ctrl);


module.exports = router;


