
const dotenv = require('dotenv')
const path = require('path')
const config = require('config')
const express = require('express')
const dbo = require('./db/db')
const host = config.get('server.port');
const cors = require('cors')
const errorHandler = require('./utils/error-handler')
const basicAuth = require('../middleware/auth')
const userRouter = require('./Users/userRouter')
const ordersRouter = require('./orders/orderRouter')
// const db = require('../')


dotenv.config({
    path:path.resolve(__dirname, '../.env')
})




const app = express()
const PORT = process.env.PORT || 5000

// app.use(auth)
app.use(express.json())

app.use(cors())



// use basic HTTP auth to secure the api
app.use(basicAuth);



app.use('/users',userRouter )
app.use('/order_items',ordersRouter)
app.use(errorHandler)
dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${host}`);
    });
  });







