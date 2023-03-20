/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 게시글 가져오기
 *     tags: [starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 카페라떼
 *                   Kcal:
 *                     type: int
 *                     example: 10
 */
