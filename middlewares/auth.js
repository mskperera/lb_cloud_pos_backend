const jwt = require("jsonwebtoken");

//Middleware to authenticate requests - MY VERSION
exports.requireSignin = async (req, res, next) => {
    
    const {jwtSecret}=req.tenant;
   
   //const token = req.cookies.accessToken;
   const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token',token)
   if (token == null) {
     return res.status(401).json({ error: 'Token is null.' });
   }

   try {
    jwt.verify(token, jwtSecret, (err, verifiedData) => {
      if (err) {
        console.log('verify err',err)
        return res.status(401).json(err)
      }

      req.authUser = verifiedData;
      console.log('verifiedData',verifiedData);
      next();
    });

   } catch (error) {
     console.log('error ****:',error);
     res.status(401).json(error);
   }
 };

 exports.authMiddleware = async (req, res, next) => {
   try {

     console.log("authMiddleware",  req.authUser);
     next();
   } catch (error) {
     console.log("error ****:", error);
     res.status(401).json(error);
   }
 };
 