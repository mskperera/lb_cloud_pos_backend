const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const morgan = require('morgan');
const { readdirSync } = require('fs');

//test();

module.exports=app;
// //connection string
// var connectionString = process.env.DATABASE_MSSQL;

// sql
//   .connect(connectionString)
//   .then(() => {
//     console.log('MsSql Connected.');
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
//if (process.env.NODE_ENV === "development") {
//app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
//}

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and other credentials
};

// Use CORS middleware
app.use(cors(corsOptions));

//app.use(cors());

//reoutes middlewares

const routeArr = readdirSync('./routes');
routeArr.map((r) => {
  //import routes
   const route = require('./routes/' + r);
  //routes middlewares
   app.use('/api', route);
});


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .send({ title: 'Unauthorized', details: 'Unauthorized access!' });
  }
});

app.use("/", (req, res) => {
  res.json({ message: "Api is working..." });
});


// const getproductid=async ()=>{
//   const dc_ProductId=await get_DC_ProductIdByProductId(10);

//   console.log('getDC_ProductIdByProductId',dc_ProductId);
  
// }

// getproductid();

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

