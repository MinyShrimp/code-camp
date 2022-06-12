import AdminBro from 'admin-bro';
import { createConnection } from 'typeorm';
import { NestFactory } from '@nestjs/core';

import * as AdminBroExpress from '@admin-bro/express';
import { Database } from '@admin-bro/typeorm';
import { Resource } from './admin/interfaces/Resource.base';

import { Resources } from './admin/resource.loader';
import { AdminModule } from './admin/admin.module';

async function runAdmin() {
    const app = await NestFactory.create(AdminModule);

    const connection = await createConnection({
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

    // const user = connection.getRepository(UserEntity);

    const admin = {
        email: process.env.ADMIN_EMAIL,
        pwd: process.env.ADMIN_PWD,
    };

    const authenticated = {
        authenticate: async (
            email: string,
            pwd: string, //
        ) => {
            console.log(admin);
            if (email === admin.email && pwd === admin.pwd) {
                return admin;
            }

            return null;
        },
        cookieName: 'adminBro',
        cookiePassword: admin.pwd,
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
