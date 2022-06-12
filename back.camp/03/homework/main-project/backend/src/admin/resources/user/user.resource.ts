import AdminJS, { ActionRequest, ActionResponse, ActionContext } from 'adminjs';
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
                before: async (request: any) => {
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
                component: AdminJS.bundle('./components/signup.component'),
            },
            login: {
                actionType: 'resource',
                component: AdminJS.bundle('./components/login.component'),
            },
            logout: {
                actionType: 'resource',
                component: AdminJS.bundle('./components/logout.component'),
            },
            softdelete: {
                actionType: 'resource',
                component: AdminJS.bundle('./components/softdelete.component'),
            },

            // Record Action
            Logout: {
                actionType: 'record',
                isVisible: true,
                component: false,
                handler: async (
                    req: ActionRequest,
                    res: ActionResponse,
                    ctx: ActionContext,
                ) => {
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
                handler: async (
                    req: ActionRequest,
                    res: ActionResponse,
                    ctx: ActionContext,
                ) => {
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
                handler: async (
                    req: ActionRequest,
                    res: ActionResponse,
                    ctx: ActionContext,
                ) => {
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
