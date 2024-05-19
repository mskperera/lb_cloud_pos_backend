const { error_log_insert } = require("../sql/operational");

exports.add_error_log = async (
    user,
    activity,
    err,
  ) => {
    try {
  
      
      const errorObject = {
        message: err.message,
        name: err.name,
        stack: err.stack,
      };
  
      const errorJson = JSON.stringify(errorObject);
  
      error_log_insert(user, "0", activity, errorJson);
  
    } catch (error) {
      console.log("error_log_insert()->error:", error);
      throw error;
    }
  };
  