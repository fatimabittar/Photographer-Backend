import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import ItemRouter from './routes/item.route.js'
import OrderRouter from './routes/order.route.js'
import ItemOrderRouter from './routes/itemOrder.route.js'
import UserRouter from './routes/user.route.js'

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//item
app.use('/api/Items', ItemRouter);
//order
app.use('/api/Orders', OrderRouter);
//ItemOrder
app.use('/api/ItemOrders', ItemOrderRouter);
//User
app.use('/api', UserRouter);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});