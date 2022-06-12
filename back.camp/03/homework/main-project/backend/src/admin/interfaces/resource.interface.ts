import { ResourceOptions } from 'adminjs';
import { BaseEntity } from 'typeorm';

export interface Resource {
    resource: typeof BaseEntity;
    options?: ResourceOptions;
}
