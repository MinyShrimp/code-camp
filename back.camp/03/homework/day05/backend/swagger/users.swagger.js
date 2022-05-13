 
/**
 * @swagger
 * /users:
 *     get:
 *         summary: 유저 목록 가져오기
 *         tags: [Users]
 *         description: GET /users
 *         responses:
 *             200:
 *                 description: Return All Users
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 properties:
 *                                     email:
 *                                         type: string
 *                                         example: "aaa@gmail.com"
 *                                     name:
 *                                         type: string
 *                                         example: "철수"
 *                                     phone:
 *                                         type: string
 *                                         example: "010-1234-5678"
 *                                     personal:
 *                                         type: string
 *                                         example: "220512-2222222"
 *                                     prefer:
 *                                         type: string
 *                                         example: "https://naver.com"
 */