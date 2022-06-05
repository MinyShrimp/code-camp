///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

// TypeORM //
import { TypeOrmModule } from '@nestjs/typeorm';

// Config //
import { ConfigModule } from '@nestjs/config';

// Modules //
import { AppModule } from './../src/app.module';

///////////////////////////////////////////////////////////////////////////
// test //
describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule, //
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
});
