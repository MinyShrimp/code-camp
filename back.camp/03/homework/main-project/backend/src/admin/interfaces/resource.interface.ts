import { ResourceOptions } from "admin-bro";
import { BaseEntity } from "typeorm";

export interface Resource {
    resource: typeof BaseEntity,
    options?: ResourceOptions
}