const { getTenant } = require("../mysql/tenantList");

//Middleware to authenticate requests
exports.setTenant = async (req, res, next) => {
    //const token = req.cookies.accessToken;
   const tenantId = req.headers['tenantid'];
  
   if (tenantId == null) {
     return res.status(400).json({ error: 'tenantId is null.' });
   }
  
   try {
     const tenant=await getTenant(tenantId);
     req.tenant = tenant;
     const poolConfig = tenant.pool.config;
     const host = poolConfig.connectionConfig.host;
     const user = poolConfig.connectionConfig.user;
     const database = poolConfig.connectionConfig.database;
    // console.log('swiched to tenancy:',{user,database,tenantId:tenant.tenantId});
     //console.log('----------------------------------------');
     next();
   } catch (error) {
     res.status(401).json({ 
       error: {
         message: error.message,
         name: error.name,
       }
     });
   }
  };