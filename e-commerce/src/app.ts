require('express-async-errors');
import express from 'express';
import dotenv  from 'dotenv';
import cookieParser  from 'cookie-parser';
import { pool } from './db/pool';
import { authRouter, likeRouter, orderRouter, productRouter, reviewRouter } from './route';
import { notFound } from './middleware/notFoundMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET as string));

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/like', likeRouter);
app.use('/api/review', reviewRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);


pool.connect({
  connectionString: process.env.DATABASE_URL
})
  .then(() => {
    app.listen(process.env.PORT, () => {

      console.log(`Server is running on port ${process.env.PORT}`);
    });
  });

