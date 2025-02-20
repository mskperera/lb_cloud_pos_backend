const jwt = require("jsonwebtoken");
const { USER_ROLE } = require("../utils/constants");

exports.requireSignin = async (req, res, next) => {
  const { jwtSecret } = req.tenant;

  //const token = req.cookies.accessToken;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "Token is null." });
  }

  try {
    jwt.verify(token, jwtSecret, (err, verifiedData) => {
      if (err) {
        console.log("verify err", err);
        return res.status(401).json(err);
      }

      req.authUser = verifiedData;
      next();
    });
  } catch (error) {
    console.log("error ****:", error);
    res.status(401).json(error);
  }
};

exports.authMiddleware = async (req, res, next) => {
  try {


    
    console.log("authMiddleware **********",  req.authUser);
    next();
  } catch (error) {
    console.log("error ****:", error);
    res.status(401).json(error);
  }
};


exports.authMiddleware = async (req, res, next) => {
  try {

  const userRoleId=req.authUser.userRoleId;
  
    if (userRoleId === USER_ROLE.ADMIN) {
      // Admin tasks
    } else if (userRoleId === USER_ROLE.MANAGER) {
      // Manager tasks
    } else if (userRoleId === USER_ROLE.CASHIER) {
      // Cashier tasks
     // return res.status(403).json({ error: "You are not authorized to perform this action." });
    } else {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.log("error ****:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

