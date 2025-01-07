import multer from 'multer';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import aws from 'aws-sdk';
import { BadRequestError } from '../errors';


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dirname = path.resolve(__dirname, '../../public/uploads');
//     fs.mkdir(dirname, { recursive: true }).then(() => cb(null, dirname));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

const storage = multer.memoryStorage();


export const imageUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb({ message: 'Error LIMIT', name: 'Error' });
    }
  } });
