import { Request, Express } from 'express';
import { s3 } from '../utils/S3';
import crypto from 'node:crypto';
import { BadRequestError } from '../errors';

class ProductService {

  async uploadImage(req: Request) {
    const file = req.file;
    if (!file) {
      throw new BadRequestError('There is not file', 404);
    }
    //Key can do with uuid
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: crypto.randomUUID(),
      Body: file.buffer,
      ContentType: file.mimetype
    };
    const result = await s3.upload(params).promise();

    return result.Location;
  }

  async removeImage(id: string) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: id

    };
    return await s3.deleteObject(params).promise();
  }

  async replaceImage(id: string, file: Express.Multer.File) {
    await this.removeImage(id);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: id,
      Body: file.buffer,
      ContentType: file.mimetype
    };
    return await s3.upload(params).promise();
  }

}

export default new ProductService();
