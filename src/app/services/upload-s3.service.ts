import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadS3Service  {

  constructor() { }

  uploadFile(file: any, filePath: any) {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: '',// ACCESS_KEY_ID
        secretAccessKey: '',// SECRET_ACCESS_KEY
        region: 'us-east-2',// BUCKET_REGION
      });
      const params = {
        Bucket: '',//BUCKET_NAME
        Key: filePath,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
