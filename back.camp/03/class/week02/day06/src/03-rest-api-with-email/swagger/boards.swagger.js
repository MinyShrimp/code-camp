 
/**
 * @swagger
 * /boards:
 *     get:
 *         summary: 게시글 가져오기
 *         tags: [Board]
 *         description: GET /boards
 *         responses:
 *             200:
 *                 description: Return All Board Data
 *     post:
 *         summary: 게시글 가져오기
 *         tags: [Board]
 *         description: POST /boards
 *         parameters:
 *             - in: query
 *               name: number
 *               type: int
 *         responses:
 *             200:
 *                 description: Return New Board Data
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 properties:
 *                                     number:
 *                                         type: int
 *                                         example: 3
 *                                     writer:
 *                                         type: string
 *                                         example: "철수"
 *                                     title:
 *                                         type: string
 *                                         example: "안녕하세요"
 *                                     contents:
 *                                         type: string
 *                                         example: "저는 짱구가 싫어요"
 */