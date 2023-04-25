import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    console.log(file);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'backend-383502', // 프로젝트 선택 클릭하면 볼 수 있음
      keyFilename: 'backend-383502-918784f87412.json',
    }).bucket('codecamp-pyeong-storage');
    // 1-2) 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file('aaa.png').createWriteStream())
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    console.log('파일 전송이 완료되었습니다.');
    return '끝!';
  }
}
