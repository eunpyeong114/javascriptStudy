/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원 가입하기
 *     description: 회원 가입을 위해 정보(이름, 이메일주소, 주민등록번호, 선호하는 웹사이트 주소, 비밀번호, 휴대폰번호) 입력
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               personal:
 *                 type: string
 *               prefer:
 *                 type: string
 *               pwd:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: 전은평
 *               email: 77541054a@gmail.com
 *               personal: 950114-1111111
 *               prefer: https://naver.com
 *               pwd: '12345'
 *               phone: '01077541054'
 *     responses:
 *       200:
 *         description: 회원 가입 성공시 id값 출력
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 61e62e84bf8893ecb66f35f9
 *       422:
 *         description: 회원 가입 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 에러!! 핸드폰 번호가 인증되지 않았습니다.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 목록 조회하기
 *     description: 회원 가입을 위해 정보 입력(이름, 이메일주소, 주민등록번호, 선호하는 웹사이트 주소, 비밀번호, 휴대폰번호)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 회원 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 61e62e84bf8893ecb66f35f9
 *                   name:
 *                     type: string
 *                     example: 아라111
 *                   email:
 *                     type: string
 *                     example: ala@gmail.com
 *                   personal:
 *                     type: string
 *                     example: 220101-*******
 *                   prefer:
 *                     type: string
 *                     example: https://naver.com
 *                   pwd:
 *                     type: string
 *                     example: 1234
 *                   og:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: 네이버
 *                       description:
 *                         type: string
 *                         example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                       image:
 *                         type: string
 *                         example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 */
