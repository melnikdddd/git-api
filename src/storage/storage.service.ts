import { Injectable } from '@nestjs/common';
import * as AWS from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3: AWS.S3;

  constructor() {}
}
