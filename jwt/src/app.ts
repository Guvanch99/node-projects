import 'express-async-errors';
import express from 'express';
import dotenv  from 'dotenv';
import cookieParser  from 'cookie-parser';
import { pool } from './db/pool';
import { authRouter } from './route';
import { notFound } from './middleware/notFoundMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
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

