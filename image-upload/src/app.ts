require('express-async-errors');
import express from 'express';
import dotenv  from 'dotenv';
import cookieParser  from 'cookie-parser';
import { productRouter } from './route';

import { notFound } from './middleware/notFoundMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET as string));

app.use('/api/v1/product', productRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);


app.listen(1111, () => {

  console.log(`Server is running on port ${process.env.PORT}`);
});
