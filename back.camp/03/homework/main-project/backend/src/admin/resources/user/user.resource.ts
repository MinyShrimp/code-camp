import adminBro, { ActionRequest } from 'admin-bro';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../../apis/user/entities/user.entity';
import { Resource } from '../../interfaces/resource.interface';

export const UserResource: Resource = {
    resource: UserEntity,
    options: {
        listProperties: [
            'id',
            'name',
            'email',
            'loginAt',
            'logoutAt',
            'isLogin',
            'updateAt',
            'deleteAt',
        ],
        editProperties: ['name', 'email', 'pwd', 'isAdmin'],
        showProperties: [
            'id',
            'name',
            'email',
            'loginAt',
            'logoutAt',
            'isLogin',
            'createAt',
            'updateAt',
            'deleteAt',
        ],

        actions: {
            new: {
                before: async (request: ActionRequest) => {
                    if (request.payload.pwd) {
                        request.payload = {
                            ...request.payload,
                            pwd: bcrypt.hashSync(
                                request.payload.pwd,
                                bcrypt.genSaltSync(),
                            ),
                        };
                    }
                    return request;
                },
            },

            // Resource Action
            signup: {
                actionType: 'resource',
                component: adminBro.bundle('./components/signup.component.jsx'),
            },
            login: {
                actionType: 'resource',
                component: adminBro.bundle('./components/login.component.jsx'),
            },
            logout: {
                actionType: 'resource',
                component: adminBro.bundle('./components/logout.component.jsx'),
            },
            softdelete: {
                actionType: 'resource',
                component: adminBro.bundle(
                    './components/softdelete.component.jsx',
                ),
            },

            // Record Action
            Logout: {
                actionType: 'record',
                isVisible: true,
                component: false,
                handler: async (req, res, ctx) => {
                    await ctx.resource.update(req.params.recordId, {
                        isLogin: false,
                        logoutAt: new Date(),
                    });
                    return {
                        record: ctx.record.toJSON(ctx.currentAdmin),
                        redirectUrl: ctx.h.resourceActionUrl({
                            resourceId: ctx.resource.id(),
                            actionName: 'list',
                        }),
                        notice: {
                            message: 'Successfully Logout',
                            type: 'success',
                        },
                    };
                },
            },
            SoftDelete: {
                actionType: 'record',
                isVisible: true,
                component: false,
                handler: async (req, res, ctx) => {
                    await ctx.resource.update(req.params.recordId, {
                        isLogout: false,
                        deleteAt: new Date(),
                        logoutAt: new Date(),
                    });
                    return {
                        record: ctx.record.toJSON(ctx.currentAdmin),
                        redirectUrl: ctx.h.resourceActionUrl({
                            resourceId: ctx.resource.id(),
                            actionName: 'list',
                        }),
                        notice: {
                            message: 'Successfully Delete',
                            type: 'success',
                        },
                    };
                },
            },
            Restore: {
                actionType: 'record',
                isVisible: true,
                component: false,
                handler: async (req, res, ctx) => {
                    await ctx.resource.update(req.params.recordId, {
                        deleteAt: null,
                    });
                    return {
                        record: ctx.record.toJSON(ctx.currentAdmin),
                        redirectUrl: ctx.h.resourceActionUrl({
                            resourceId: ctx.resource.id(),
                            actionName: 'list',
                        }),
                        notice: {
                            message: 'Successfully Restore',
                            type: 'success',
                        },
                    };
                },
            },
        },
    },
};
