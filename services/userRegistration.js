const {
  userRegistration_insert_update_sql,
  userRegistration_select_sql,
  userRegistration_delete_sql,
} = require("../sql/userRegistaration");

exports.userRegistrationAdd_srv = async (
  tenant,
  tableId,
  userRoleId,
  uName,
  passwordHash,
  passwordSalt,
  email,
  displayName,
  profilePic,
  isActive
) => {

  if (!userRoleId) {
    return {
      error: { message: "userRoleId is Required" },
    };
  }

  if (!uName) {
    return {
      error: { message: "uName is Required" },
    };
  }

  if (!passwordHash) {
    return {
      error: { message: "passwordHash is Required" },
    };
  }

  if (!passwordSalt) {
    return {
      error: { message: "passwordSalt is Required" },
    };
  }

  if (!email) {
    return {
      error: { message: "email is Required" },
    };
  }

  if (!displayName) {
    return {
      error: { message: "displayName is Required" },
    };
  }

  if (!profilePic) {
    return {
      error: { message: "profilePic is Required" },
    };
  }

  console.log('isActive',isActive)
  if (isActive === undefined || isActive === null) {
    return {
      error: { message: "isActive is Required" },
    };
  }

  const utcOffset = "5:30";
  const userLogId = 1;
  const saveType = "I";

  try {
    const result = await userRegistration_insert_update_sql(
      tenant,
      tableId,
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      profilePic,
      isActive,
      saveType,
      userLogId,
      utcOffset
    );

    return result;
  } catch (error) {
    console.log("userRegistrationAdd_srv()-> error :", error);
    throw error;
  }
};

exports.userRegistrationUpdate_srv = async (
  tenant,
  tableId,
  userRoleId,
  uName,
  passwordHash,
  passwordSalt,
  email,
  displayName,
  profilePic,
  isActive
) => {

  if (!tableId) {
    return {
      error: { message: "tableId is Required" },
    };
  }

  if (!userRoleId) {
    return {
      error: { message: "userRoleId is Required" },
    };
  }

  if (!uName) {
    return {
      error: { message: "uName is Required" },
    };
  }

  if (!passwordHash) {
    return {
      error: { message: "passwordHash is Required" },
    };
  }

  if (!passwordSalt) {
    return {
      error: { message: "passwordSalt is Required" },
    };
  }

  if (!email) {
    return {
      error: { message: "email is Required" },
    };
  }

  if (!displayName) {
    return {
      error: { message: "displayName is Required" },
    };
  }

  if (!profilePic) {
    return {
      error: { message: "profilePic is Required" },
    };
  }

  if (!isActive) {
    return {
      error: { message: "isActive is Required" },
    };
  }

  const utcOffset = "5:30";
  const userLogId = 1;
  const saveType = "U";

  try {
    const result = await userRegistration_insert_update_sql(
      tenant,
      tableId,
      userRoleId,
      uName,
      passwordHash,
      passwordSalt,
      email,
      displayName,
      profilePic,
      isActive,
      saveType,
      userLogId,
      utcOffset
    );

    return result;
  } catch (error) {
    console.log("userRegistrationAdd_srv()-> error :", error);
    throw error;
  }
};

exports.userRegistration_select_srv = async (tenant,
  userId,
  userRoleIds,
  uName,
  email,
  searchByKeyword,
  skip,
  limit
) => {

  const userLogId = 1;

  try {
    const result = await userRegistration_select_sql(
      tenant,
      userId,
      userRoleIds,
      uName,
      email,
      searchByKeyword,
      skip,
      limit,
      userLogId
    );

    return result;

  } catch (error) {
    console.log("userRegistrationAdd_srv()-> error :", error);
    throw error;
  }
};

exports.deleteUserRegistration_srv = async (tenant,userId) => {

  const userLogId = 1;
  const utcOffset = "5:30";
  const pageName = "p";
  const isConfirm=true;
  try {
    const result = await userRegistration_delete_sql(
      tenant,
      userId,
      userLogId,
      utcOffset,
      pageName,
      isConfirm
    );

    return result;

  } catch (error) {
    console.log("deleteUserRegistration_srv()-> error :", error);
    throw error;
  }
};