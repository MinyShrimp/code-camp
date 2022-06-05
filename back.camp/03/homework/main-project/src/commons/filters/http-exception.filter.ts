/**
 * HTTP 예외 필터
 */

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { ResultMessage } from '../dto/ResultMessage.dto';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost, //
    ) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const msg = exception.message;
        const status = exception.getStatus();

        console.log('================================');

        /* 이미 판매 완료된 상품입니다 */
        // console.log(msg);

        /* 422 */
        // console.log(status);

        const res = new ResultMessage({
            status: status,
            contents: msg,
            isSuccess: false,
        });
        console.log(res);

        // const ctx = host.switchToHttp();
        // const response = ctx.getResponse();

        // const { httpAdapter } = this.httpAdapterHost;
        // httpAdapter.reply(
        //     response,
        //     {
        //         statusCode: status,
        //         timestamp: new Date().toISOString(),
        //     },
        //     status,
        // );

        // response.json({
        //     statusCode: status,
        //     timestamp: new Date().toISOString(),
        // });

        /**
         * {
         *     statusCode: 422,
         *     message: '이미 판매 완료된 상품입니다.',
         *     error: 'Unprocessable Entity'
         * }
         */
        // console.log(exception.getResponse());

        /**
         * UnprocessableEntityException: 이미 판매 완료된 상품입니다.
         *     at ProductService.checkSoldout (/Users/gimhoemin/Desktop/project/code.camp/back.camp/03/class/day19/01-typeorm-softdelete/src/apis/products/Product.service.ts:68:19)
         *     at processTicksAndRejections (node:internal/process/task_queues:96:5)
         *     at ProductResolver.updateProduct (/Users/gimhoemin/Desktop/project/code.camp/back.camp/03/class/day19/01-typeorm-softdelete/src/apis/products/product.resolver.ts:34:9)
         *     at target (/Users/gimhoemin/Desktop/project/code.camp/back.camp/03/class/day19/01-typeorm-softdelete/node_modules/@nestjs/core/helpers/external-context-creator.js:77:28)
         *     at Object.updateProduct (/Users/gimhoemin/Desktop/project/code.camp/back.camp/03/class/day19/01-typeorm-softdelete/node_modules/@nestjs/core/helpers/external-proxy.js:9:24)
         * {
         *     response: {
         *         statusCode: 422,
         *         message: '이미 판매 완료된 상품입니다.',
         *         error: 'Unprocessable Entity'
         *     },
         *     status: 422
         * }
         */
        // console.log(exception);

        /**
         * ExecutionContextHost {
         *     args: [
         *         undefined,
         *         {
         *         productID: '1cbe7492-fa9a-4eb1-8d96-16bbea60387d',
         *         updateProductInput: [Object: null prototype]
         *         },
         *         { req: [IncomingMessage] },
         *         {
         *         fieldName: 'updateProduct',
         *         fieldNodes: [Array],
         *         returnType: [GraphQLNonNull],
         *         parentType: [GraphQLObjectType],
         *         path: [Object],
         *         schema: [GraphQLSchema],
         *         fragments: [Object: null prototype] {},
         *         rootValue: undefined,
         *         operation: [Object],
         *         variableValues: {},
         *         cacheControl: [Object]
         *         }
         *     ],
         *     constructorRef: null,
         *     handler: null,
         *     contextType: 'graphql'
         * }
         */
        // console.log(host);

        console.log('================================');
    }
}

export default HttpExceptionFilter;
