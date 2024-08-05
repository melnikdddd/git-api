import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class StorageService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(
    file: Buffer,
    bucket: string,
    name: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: file,
    };

    return this.s3.upload(params).promise();
  }

  async getFile(bucket: string, name: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: bucket,
      Key: name,
    };

    return this.s3.getObject(params).promise();
  }

  async deleteFile(
    bucket: string,
    name: string,
  ): Promise<AWS.S3.DeleteObjectOutput> {
    const params = {
      Bucket: bucket,
      Key: name,
    };

    return this.s3.deleteObject(params).promise();
  }
}