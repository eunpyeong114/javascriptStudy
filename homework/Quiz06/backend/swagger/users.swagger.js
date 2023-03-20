/**
 * @swagger
 * /users:
 *   get:
 *     summary: 게시글 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                    email:
 *                     type: string
 *                     example: code@camp.com
 *                    name:
 *                     type: string
 *                     example: 김코딩
 *                    phone:
 *                     type: string
 *                     example: "010-1234-5678"
 *                    personal:
 *                     type: string
 *                     example: "123456-1234567"
 *                    prefer:
 *                     type: string
 *                     example: "https://naver.com"
 */
