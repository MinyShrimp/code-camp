#!/bin/bash

FILENAME=$1

APIDIR=./src/apis/$FILENAME
UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"

mkdir $APIDIR
mkdir $APIDIR/entities
mkdir $APIDIR/dto

##############################################################################
# Module
MODULE_FILE=$APIDIR/$FILENAME.module.ts
echo "import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ${UPPER}Entity } from './entities/${FILENAME}.entity'
import { ${UPPER}Resolver } from './${FILENAME}.resolver';
import { ${UPPER}Service } from './${FILENAME}.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ${UPPER}Entity, //
        ]),
    ],
    providers: [
        ${UPPER}Resolver, //
        ${UPPER}Service,
    ],
})
export class ${UPPER}Module {}" >> $MODULE_FILE

##############################################################################
# Resolver
RESOLVER_FILE=$APIDIR/$FILENAME.resolver.ts
echo "import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { ${UPPER}Entity } from './entities/${FILENAME}.entity';
import { Create${UPPER}Input } from './dto/create${UPPER}.input';
import { Update${UPPER}Input } from './dto/update${UPPER}.input';
import { ${UPPER}Service } from './${FILENAME}.service';

/* ${UPPER} API */
@Resolver()
export class ${UPPER}Resolver {
    private static readonly NAME = '${UPPER}';

    constructor(
        private readonly ${FILENAME}Service: ${UPPER}Service, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/${FILENAME}s
     * @response 조회된 전체 목록
     */
    @Query(
        () => [${UPPER}Entity], //
        { description: \`\${${UPPER}Resolver.NAME} 전체 조회\` },
    )
    fetch${UPPER}s(): Promise<${UPPER}Entity[]> {
        return this.${FILENAME}Service.findAll();
    }

    /**
     * GET /api/${FILENAME}/:id
     * @param ${FILENAME}ID
     * @response 조회된 단일 목록
     */
    @Query(
        () => ${UPPER}Entity, //
        { description: \`\${${UPPER}Resolver.NAME} 단일 조회\` },
    )
    fetch${UPPER}(
        @Args('${FILENAME}ID') ${FILENAME}ID: string, //
    ): Promise<${UPPER}Entity> {
        return this.${FILENAME}Service.findOne(${FILENAME}ID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/${FILENAME}
     * @param create${UPPER}Input
     * @response 생성된 정보
     */
    @Mutation(
        () => ${UPPER}Entity, //
        { description: \`\${${UPPER}Resolver.NAME} 생성\` },
    )
    create${UPPER}(
        @Args('create${UPPER}Input') create${UPPER}Input: Create${UPPER}Input,
    ): Promise<${UPPER}Entity> {
        return this.${FILENAME}Service.create(create${UPPER}Input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/${FILENAME}/:id
     * @param ${FILENAME}ID
     * @param update${UPPER}Input
     * @response 수정된 정보
     */
    @Mutation(
        () => ${UPPER}Entity, //
        { description: \`\${${UPPER}Resolver.NAME} 수정\` },
    )
    update${UPPER}(
        @Args('${FILENAME}ID') ${FILENAME}ID: string, //
        @Args('update${UPPER}Input') update${UPPER}Input: Update${UPPER}Input,
    ): Promise<${UPPER}Entity> {
        return this.${FILENAME}Service.update(${FILENAME}ID, update${UPPER}Input);
    }

    /**
     * PUT /api/${FILENAME}/:id
     * @param ${FILENAME}ID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: \`\${${UPPER}Resolver.NAME} 삭제 취소\` },
    )
    restore${UPPER}(
        @Args('${FILENAME}ID') ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        return this.${FILENAME}Service.restore(${FILENAME}ID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/${FILENAME}/:id
     * @param ${FILENAME}ID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: \`\${${UPPER}Resolver.NAME} 삭제 ( Real )\` },
    )
    delete${UPPER}(
        @Args('${FILENAME}ID') ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        return this.${FILENAME}Service.delete(${FILENAME}ID);
    }

    /**
     * DELETE /api/${FILENAME}/:id
     * @param ${FILENAME}ID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: \`\${${UPPER}Resolver.NAME} 삭제 ( Soft )\` },
    )
    softDelete${UPPER}(
        @Args('${FILENAME}ID') ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        return this.${FILENAME}Service.softDelete(${FILENAME}ID);
    }
}" >> $RESOLVER_FILE

##############################################################################
# Service
SERVICE_FILE=$APIDIR/$FILENAME.service.ts
echo "import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { ${UPPER}Entity } from './entities/${FILENAME}.entity';
import { Create${UPPER}Input } from './dto/create${UPPER}.input';
import { Update${UPPER}Input } from './dto/update${UPPER}.input';

@Injectable()
export class ${UPPER}Service {
    constructor(
        @InjectRepository(${UPPER}Entity)
        private readonly ${FILENAME}Repository: Repository<${UPPER}Entity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     * @returns 조회된 정보 목록
     */
    async findAll(): Promise<${UPPER}Entity[]> {
        return await this.${FILENAME}Repository.find({});
    }

    /**
     * 단일 조회
     * @param ${FILENAME}ID
     * @returns 조회된 정보
     */
    async findOne(
        ${FILENAME}ID: string, //
    ): Promise<${UPPER}Entity> {
        return await this.${FILENAME}Repository.findOne({
            where: { id: ${FILENAME}ID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 생성
     * @param create${UPPER}Input
     * @returns 생성된 정보
     */
    async create(
        create${UPPER}Input: Create${UPPER}Input, //
    ): Promise<${UPPER}Entity> {
        const { ...input } = create${UPPER}Input;

        return await this.${FILENAME}Repository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 수정
     * @param ${FILENAME}ID
     * @param update${UPPER}Input
     * @returns 수정된 정보
     */
    async update(
        ${FILENAME}ID: string, //
        update${UPPER}Input: Update${UPPER}Input,
    ): Promise<${UPPER}Entity> {
        const { ...input } = update${UPPER}Input;

        const ${FILENAME} = await this.findOne(${FILENAME}ID);

        return await this.${FILENAME}Repository.save({
            ...${FILENAME},
            ...input,
        });
    }

    /**
     * 삭제 취소
     * @param ${FILENAME}ID
     * @returns ResultMessage
     */
    async restore(
        ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        const result = await this.${FILENAME}Repository.restore({
            id: ${FILENAME}ID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: ${FILENAME}ID,
            isSuccess,
            contents: isSuccess
                ? \`Completed ${UPPER} Restore\`
                : \`Failed ${UPPER} Restore\`,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 삭제 ( Real )
     * @param ${FILENAME}ID
     * @returns ResultMessage
     */
    async delete(
        ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        const result = await this.${FILENAME}Repository.delete({
            id: ${FILENAME}ID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: ${FILENAME}ID,
            isSuccess,
            contents: isSuccess
                ? \`Completed ${UPPER} Delete\`
                : \`Failed ${UPPER} Delete\`,
        });
    }

    /**
     * 삭제 ( Soft )
     * @param ${FILENAME}ID
     * @returns ResultMessage
     */
    async softDelete(
        ${FILENAME}ID: string, //
    ): Promise<ResultMessage> {
        const result = await this.${FILENAME}Repository.softDelete({
            id: ${FILENAME}ID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: ${FILENAME}ID,
            isSuccess,
            contents: isSuccess
                ? \`Completed ${UPPER} Soft Delete\`
                : \`Failed ${UPPER} Soft Delete\`,
        });
    }
}" >> $SERVICE_FILE

##############################################################################
# Entity
ENTITY_FILE=$APIDIR/entities/$FILENAME.entity.ts
echo "import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* ${UPPER} Entity */
@Entity({ name: '${FILENAME}' })
@ObjectType({ description: '${UPPER} Entity' })
export class ${UPPER}Entity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @DeleteDateColumn()
    deleteAt: Date;
}" >> $ENTITY_FILE

##############################################################################
# Create DTO
CREATE_DTO_FILE=$APIDIR/dto/create$UPPER.input.ts
echo "import { InputType, PickType } from '@nestjs/graphql';
import { ${UPPER}Entity } from '../entities/${FILENAME}.entity';

@InputType()
export class Create${UPPER}Input extends PickType(
    ${UPPER}Entity, //
    [],
    InputType,
) {}" >> $CREATE_DTO_FILE

##############################################################################
# Update DTO

UPDATE_DTO_FILE=$APIDIR/dto/update$UPPER.input.ts
echo "import { InputType, PartialType } from '@nestjs/graphql';
import { Create${UPPER}Input } from './create${UPPER}.input';

@InputType()
export class Update${UPPER}Input extends PartialType(Create${UPPER}Input) {}
" >> $UPDATE_DTO_FILE