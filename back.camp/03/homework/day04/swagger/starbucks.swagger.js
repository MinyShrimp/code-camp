 
/**
 * @swagger
 * /starbucks:
 *     get:
 *         summary: 카페 메뉴 리스트 가져오기
 *         tags: [Starbucks]
 *         description: GET /starbucks
 *         responses:
 *             200:
 *                 description: Return All Coffee
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 properties:
 *                                     name:
 *                                         type: string
 *                                         example: "아메리카노"
 *                                     kcal:
 *                                         type: int
 *                                         example: 5
 */