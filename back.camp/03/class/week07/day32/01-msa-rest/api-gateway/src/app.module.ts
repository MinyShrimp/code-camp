import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "AUTH_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: "auth-service",
                    port: 3000,
                },
            },
            {
                name: "RESOURCE_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: "resource-service",
                    port: 3000,
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
