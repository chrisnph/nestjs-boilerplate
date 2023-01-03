import { Injectable, NotAcceptableException } from '@nestjs/common';
import { admin } from '.';

@Injectable()
export class FirebaseService {
  async uploadSingleFile({ file, fileName, filePath }) {
    const bucketFile = admin.storage().bucket().file(filePath);

    return bucketFile.save(file.buffer, (err) => {
      if (err) throw new NotAcceptableException('invalid bucket or file');

      return bucketFile
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        })
        .then((signedUrls) => {
          return signedUrls[0];
        });
    });
  }
}
