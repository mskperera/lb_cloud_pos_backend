const { category_select_sql, category_register_menu_select_sql, category_dropdown_select_sql } = require("../sql/category");
const { drp_department_select_sql } = require("../sql/department");


exports.getDepartment_dropdown =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_department_select_sql(tenant, userLogId,utcOffset,pageName);

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
