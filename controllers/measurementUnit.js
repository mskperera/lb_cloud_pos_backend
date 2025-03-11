const { measurementUnit_select_sql, measurementUnit_dropdown_select_sql, measurementUnit_insert_update_sql, measurementUnit_delete_sql } = require("../sql/measurementUnit");



exports.getMeasurementUnit_dropdown =async (req, res) => {

  const { } = req.body;
  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=req.authUser.userLogId;
  const pageName='p';

  try {
  const result= await measurementUnit_dropdown_select_sql(tenant, userLogId,utcOffset,pageName);

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



exports.getMeasurementUnits =async (req, res) => {

  const {measurementUnitId,limit,skip } = req.body;
  const tenant=req.tenant;
  const userLogId=req.authUser.userLogId;
console.log('req.body',req.body)
  try {
  const result= await measurementUnit_select_sql(tenant,measurementUnitId,skip,limit, userLogId);

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

exports.addmeasurementUnit = async (req, res) => {
  const {measurementUnitName} =req.body;
  console.log('addmeasurementUnit')
  const tenant = req.tenant;
  const userLogId = 1;
  const saveType = "I";

  try {

    if (!measurementUnitName) {
      return res.status(422).json({
        error: {message:"measurementUnitName is Required"},
      });
    }

    const result = await measurementUnit_insert_update_sql(
      tenant,
      null,
      measurementUnitName,
      saveType,
      userLogId,
    );
    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

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

exports.updatemeasurementUnit = async (req, res) => {
  const {measurementUnitName} =req.body;

  const {measurementUnitId}=req.params;
  console.log('updatemeasurementUnit',measurementUnitId)
  const tenant = req.tenant;
  const userLogId = 1;
  const saveType = "U";


  try {

    if (!measurementUnitId) {
      return res.status(422).json({
        error: {message:"measurementUnitId is Required"},
      });
    }

    if (!measurementUnitName) {
      return res.status(422).json({
        error: {message:"measurementUnitName is Required"},
      });
    }

    const result = await measurementUnit_insert_update_sql(
      tenant,
      measurementUnitId,
      measurementUnitName,
      saveType,
      userLogId,
    );
    if(result.error){
      return res.status(422).json({
        error:result.error
      });
  }

    res.status(201).json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};

exports.deletemeasurementUnit = async (req, res) => {
  const { measurementUnitId } = req.params;

  const tenant = req.tenant;
  const userLogId = 1;

  try {
    const result = await measurementUnit_delete_sql(
      tenant,
      measurementUnitId,
      userLogId
    );

    res.json(result);
  } catch (err) {
    console.log("Errori: ", err);
    return res.status(400).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  }
};
