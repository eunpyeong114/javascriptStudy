/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 인증번호 요청하기
 *     description: 본인인증번호 발급을 위해 휴대폰 번호 입력
 *     tags: [Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *             example:
 *               phone: '01077541054'
 *     responses:
 *       200:
 *         description: 인증번호 전송 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 핸드폰으로 인증 문자가 전송되었습니다!
 *       400:
 *         description: 인증번호 전송 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 휴대폰 번호를 제대로 입력해 주세요
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 인증번호 인증하기
 *     description: 본인 인증을 위해 입력한 인증번호와 휴대폰 번호를 보내고 실제 인증번호와 비교
 *     tags: [Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               token:
 *                 type: string
 *             example:
 *               phone: '01077541054'
 *               token: ""
 *     responses:
 *       200:
 *         description: 인증 성공시
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: true
 *       401:
 *         description: 인증 실패시
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: false
 */
