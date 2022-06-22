import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";

@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            gateway: {
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [
                        {
                            name: "auth",
                            url: "http://auth-service:3002/graphql",
                        },
                        {
                            name: "resouce",
                            url: "http://resource-service:3003/graphql",
                        },
                    ],
                }),
            },
        }),
    ],
    providers: [],
})
export class AppModule {}
