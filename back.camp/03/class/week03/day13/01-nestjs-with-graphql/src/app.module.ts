import { Module } from "@nestjs/common";
///////////////////////////////////////////////////////////////////////////
// 추가된 부분 //
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import BoardsModule from "./apis/boards/boards.module";
///////////////////////////////////////////////////////////////////////////

@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // 추가된 부분 //

        /* Modules */
        BoardsModule,

        /* GrapthQL */
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),
        ///////////////////////////////////////////////////////////////////////////
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
