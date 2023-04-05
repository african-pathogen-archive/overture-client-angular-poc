import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk/global';

@Injectable({
  providedIn: 'root'
})
export class UploadS3Service  {

  baseSubFolder: string = 'data';

  constructor() { }

  uploadFile(file: any, filePath: any) {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: 'AKIA6F66TQ5SUUFVWMWZ',// ACCESS_KEY_ID
        secretAccessKey: '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',// SECRET_ACCESS_KEY
        region: 'af-south-1',// BUCKET_REGION
      });
      const params = {
        Bucket: 'sanbi-dmsdata',//BUCKET_NAME
        Key: filePath,
        Body: `${this.baseSubFolder}/${file}`,
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
