import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

class MockAppService {
    getHello() {
        return "Hello World!";
    }
}

describe("AppController", () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useClass: MockAppService,
                },
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe("getHello", () => {
        it("should return 'Hello World!'", () => {
            expect(appController.getHello()).toEqual("Hello World!");
        });
    });
});
