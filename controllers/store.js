const { userAssignedStores_select_sql } = require("../sql/store");


exports.getUserAssignedStores_ctrl =async (req, res) => {

  const {userId } = req.query;
  const tenant=req.tenant;

  console.log('tenant tenant tenant tenant.........&&&: ',tenant)

  try {
  const result= await userAssignedStores_select_sql(tenant,userId);

  res.json(result.results[0]);

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
}

