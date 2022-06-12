import {
    BaseRecord,
    BaseResource,
    Filter,
    flat,
    ValidationError,
} from 'adminjs';
import { BaseEntity, In } from 'typeorm';
import { convertFilter } from '@adminjs/typeorm/lib/utils/filter/filter.converter';
import { Property } from '@adminjs/typeorm/lib/Property';

type ParamsType = Record<string, any>;
export class Resource extends BaseResource {
    private propsObject: Property;

    constructor(private readonly model: typeof BaseEntity) {
        super(model);
        this.propsObject = this.prepareProps();
    }

    databaseName(): string {
        return (
            (this.model.getRepository().metadata.connection.options
                .database as string) || 'typeorm'
        );
    }

    databaseType(): string {
        return (
            this.model.getRepository().metadata.connection.options.type ||
            'typeorm'
        );
    }

    name(): string {
        return this.model.name;
    }

    id(): string {
        return this.model.name;
    }

    idName() {
        return this.model.getRepository().metadata.primaryColumns[0]
            .propertyName;
    }

    properties(): Array<Property> {
        return [...Object.values(this.propsObject)];
    }

    property(path: string): Property {
        return this.propsObject[path];
    }

    async count(filter: Filter): Promise<number> {
        return await this.model.count({
            where: convertFilter(filter),
        });
    }

    async find(filter: Filter, param: any): Promise<BaseRecord[]> {
        const { limit = 10, offset = 0, sort = {} } = param;
        const { direction, sortBy } = sort;

        const instances = await this.model.find({
            where: convertFilter(filter),
            take: limit,
            skip: offset,
            order: {
                [sortBy]: (direction || 'asc').toUpperCase(),
            },
            withDeleted: true,
        });

        return instances.map((instance) => new BaseRecord(instance, this));
    }

    async findOne(id: string | number): Promise<BaseRecord | null> {
        const reference = {
            where: {},
            withDeleted: true,
        };
        reference['where'][this.idName()] = id;
        const instance = await this.model.findOne(reference);
        if (!instance) {
            return null;
        }
        return new BaseRecord(instance, this);
    }

    async findMany(ids: Array<string | number>): Promise<BaseRecord[]> {
        const reference = {
            where: {},
            withDeleted: true,
        };
        reference['where'][this.idName()] = In(ids);
        const instances = await this.model.find(reference);
        return instances.map((instance) => new BaseRecord(instance, this));
    }

    async create(params: Record<string, any>): Promise<ParamsType> {
        const instance = this.model.create(this.prepareParams(params));

        // @ts-ignore
        await this.validateAndSave(instance);
        return instance;
    }

    async update(pk: string | number, params?: any): Promise<ParamsType> {
        const reference = {
            where: {},
            withDeleted: true,
        };
        reference['where'][this.idName()] = pk;
        const instance = await this.model.findOne(reference);
        if (instance) {
            const preparedParams = this.prepareParams(params);
            Object.keys(preparedParams).forEach((paramName) => {
                instance[paramName] = preparedParams[paramName];
            });
            await this.validateAndSave(instance);
            return instance;
        }
        throw new Error('Instance not found.');
    }

    async delete(pk: string | number): Promise<any> {
        const reference = {
            where: {},
            withDeleted: true,
        };
        reference['where'][this.idName()] = pk;

        try {
            const instance = await this.model.findOne(reference);
            if (instance) {
                await instance.remove();
            }
        } catch (error) {
            if (error.name === 'QueryFailedError') {
                throw new ValidationError(
                    {},
                    {
                        type: 'QueryFailedError',
                        message: error.message,
                    },
                );
            }
            throw error;
        }
    }

    prepareProps(): any {
        const { columns } = this.model.getRepository().metadata;
        return columns.reduce((memo, col, index) => {
            const property = new Property(col, index);
            return Object.assign(Object.assign({}, memo), {
                [property.path()]: property,
            });
        }, {});
    }

    /** Converts params from string to final type */
    prepareParams(params: any) {
        const preparedParams = Object.assign({}, params);
        this.properties().forEach((property) => {
            const param = flat.get(preparedParams, property.path());
            const key = property.path();
            // eslint-disable-next-line no-continue
            if (param === undefined) {
                return;
            }
            const type = property.type();
            if (type === 'mixed') {
                preparedParams[key] = param;
            }
            if (type === 'number') {
                preparedParams[key] = Number(param);
            }
            if (type === 'reference') {
                if (param === null) {
                    preparedParams[property.column.propertyName] = null;
                } else {
                    // references cannot be stored as an IDs in typeorm, so in order to mimic this) and
                    // not fetching reference resource) change this:
                    // { postId: "1" }
                    // to that:
                    // { post: { id: 1 } }
                    const id =
                        property.column.type === Number ? Number(param) : param;
                    preparedParams[property.column.propertyName] = { id };
                }
            }
        });
        return preparedParams;
    }

    // eslint-disable-next-line class-methods-use-this
    async validateAndSave(instance: BaseEntity): Promise<any> {
        if (Resource['validate'] !== undefined) {
            // @ts-ignore
            const errors = await Resource.validate(instance);
            if (errors && errors.length) {
                const validationErrors = errors.reduce(
                    (memo, error) =>
                        Object.assign(Object.assign({}, memo), {
                            [error.property]: {
                                type: Object.keys(error.constraints)[0],
                                message: Object.values(error.constraints)[0],
                            },
                        }),
                    {},
                );
                throw new ValidationError(validationErrors);
            }
        }
        try {
            await instance.save();
        } catch (error) {
            if (error.name === 'QueryFailedError') {
                throw new ValidationError({
                    [error.column]: {
                        type: 'QueryFailedError',
                        message: error.message,
                    },
                });
            }
        }
    }

    static isAdapterFor(rawResource: any): boolean {
        try {
            return !!rawResource.getRepository().metadata;
        } catch (e) {
            return false;
        }
    }
}
