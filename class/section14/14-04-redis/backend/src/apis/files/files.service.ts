import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFile1 = await files[0];
    const waitedFile2 = await files[1];
    const waitedFiles = [waitedFile1, waitedFile2];

    console.log(waitedFiles);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'codecamp-pyeong-storage';
    const storage = new Storage({
      projectId: '구글클라우드id', // 프로젝트 선택 클릭하면 볼 수 있음
      keyFilename: '구글클라우드키파일명',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.log('파일 전송이 완료되었습니다.');
    return results;
  }
}
