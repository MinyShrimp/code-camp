import AdminBro from 'admin-bro';
import { createConnection } from 'typeorm';
import { validate } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import * as AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';

import { Resources } from './admin/resource.loader';
import { AdminModule } from './admin/admin.module';

async function runAdmin() {
    const app = await NestFactory.create(AdminModule);

    await createConnection({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/apis/**/*.entity.*'],
        charset: 'utf8mb4',
        synchronize: false,
        logging: true,
    });

    // Resource.validate = validate;
    AdminBro.registerAdapter({ Database, Resource });

    const adminBro = new AdminBro({
        resources: Resources,
        rootPath: '/admin',
        branding: {
            companyName: 'CodeCamp',
        },
    });

    const ADMIN = {
        email: process.env.ADMIN_EMAIL,
        pwd: process.env.ADMIN_PWD,
    };

    const authenticated = {
        authenticate: async (
            email: string,
            pwd: string, //
        ) => {
            if (ADMIN.email === email && ADMIN.pwd === pwd) {
                return ADMIN;
            } else {
                return null;
            }
        },
        cookieName: 'adminBro',
        cookiePassword: ADMIN.pwd,
    };

    // @ts-ignore
    const router = AdminBroExpress.buildAuthenticatedRouter(
        adminBro,
        authenticated,
    );

    app.use(adminBro.options.rootPath, router);

    await app.listen(3001);
}

runAdmin();
