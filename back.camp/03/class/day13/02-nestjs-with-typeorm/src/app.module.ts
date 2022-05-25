import { Module } from "@nestjs/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
///////////////////////////////////////////////////////////////////////////
// 추가된 부분 //
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
///////////////////////////////////////////////////////////////////////////

import BoardsModule from "./apis/boards/boards.module";
import BoardEntity from "./apis/boards/entities/board.entity";

@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // 추가된 부분 //

        /* Enviroment Config */
        /* 최상단에 위치 */
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        ///////////////////////////////////////////////////////////////////////////

        /* Modules */
        BoardsModule,

        /* GrapthQL */
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),

        ///////////////////////////////////////////////////////////////////////////
        // 추가된 부분 //
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [BoardEntity],
            synchronize: true,
            logging: true,
        }),
        ///////////////////////////////////////////////////////////////////////////
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
