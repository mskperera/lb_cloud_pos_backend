const { userRegistrationAdd_srv, userRegistration_select_srv, deleteUserRegistration_srv, userRegistrationUpdate_srv } = require('../services/userRegistration');
const { drp_userRole_select_sql } = require('../sql/userRegistaration');

exports.addUserRegistration_ctrl = async (req, res) => {

  const { 
    userRoleId,
     uName,
    passwordHash,
    passwordSalt,
    email,
    displayName,
    profilePic,
    isActive
  } = req.body;

  console.log('isActiveooooooo',isActive)
  const tenant = req.tenant;

  try {

    const result = await userRegistrationAdd_srv(
      tenant,
      null,
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      profilePic,
      isActive
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


exports.updateUserRegistration_ctrl = async (req, res) => {

    const { userId } = req.params;
    const {
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      profilePic,
      isActive} =req.body;

  const tenant = req.tenant;

  try {

    const result = await userRegistrationUpdate_srv(
      tenant,
      userId,
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      profilePic,
      isActive
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


exports.getUserRegistration_ctrl = async (req, res) => {
  const {
    userId,
    userRoleIds,
    uName,
    email,
    searchByKeyword,
    skip,
    limit,
  } = req.body;
  console.log("selectContact req.body: ", req.body);
  
  const tenant = req.tenant;

if (!Array.isArray(userRoleIds)) {
  return res.status(400).json({
    error: {
      message: "Invalid data type: userRoleIds should be an array.",
    },
  });
}

  try {
    const result = await userRegistration_select_srv(
      tenant,
      userId,
      userRoleIds,
      uName,
      email,
      searchByKeyword,
      skip,
      limit
    );

    res.status(200).json(result);
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

exports.deleteUserRegistration_ctrl = async (req, res) => {
  const { userId } = req.query;

  const tenant = req.tenant;

  try {
    const result = await deleteUserRegistration_srv(
      tenant,
      userId
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


exports.getUserRole_dropdown_ctrl =async (req, res) => {

  const tenant=req.tenant;
  const utcOffset='5:30';
  const userLogId=1;
  const pageName='p';

  try {
  const result= await drp_userRole_select_sql(tenant, userLogId,utcOffset,pageName);
  res.json(result);

} catch (err) {
  console.log('Errori: ',err)
  return res.status(400).json({ 
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });
}
};
