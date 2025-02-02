import express from 'express';
import dotenv  from 'dotenv';
import { mailRouter } from './route';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/mail', mailRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on por ${process.env.PORT}`);
});
