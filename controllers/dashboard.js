const { dashboard_details_Select_sql } = require("../sql/dashboard");

exports.getDashboardDetails =async (req, res) => {

  const {sessionId } = req.body;
  const tenant=req.tenant;
  const userLogId=1;
console.log('req.body',req.body)
  try {
  const result= await dashboard_details_Select_sql(tenant,sessionId,userLogId);

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
