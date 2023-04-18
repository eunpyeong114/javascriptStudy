import { Catch, HttpException, ExceptionFilter } from '@nestjs/common';

// 앞으로 에러가 발생하면 httpexception class로 날아온다 => catch 실행 (nestjs에서 제공하는 기능)
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('============');
    console.log('예외가 발생했어요!');
    console.log('예외내용: ', message);
    console.log('예외코드: ', status);
    console.log('============');
  }
}
