import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import SignupInput from "./dto/signup.input";
import UserEntity from "./entities/user.entity";

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({});
    }

    async findOne(
        userID: string //
    ): Promise<UserEntity> {
        // return await this.userRepository
        //     .createQueryBuilder("user")
        //     .select(["user.name"])
        //     .where(`user.id = ${userID}`)
        //     .getOne();
        return await this.userRepository.findOne({
            where: { id: userID },
        });
    }

    async findOneByEmail(
        email: string //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
        });
    }

    createPassword(
        originPwd: string //
    ): string {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(originPwd, salt);
    }

    async create(
        input: SignupInput //
    ): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            email: input.email,
        });

        if (user) {
            // throw new HttpException("중복된 이메일입니다", 409);
            // throw new HttpException("중복된 이메일입니다", HttpStatus.CONFLICT);
            throw new ConflictException(
                "중복된 이메일입니다." //
            );
        }

        input.pwd = this.createPassword(input.pwd);
        return await this.userRepository.save({
            ...input,
        });
    }

    async updateAmount(userID: string, amount: number): Promise<UserEntity> {
        // 2. 유저의 돈 찾아오기
        const user = await this.userRepository
            .createQueryBuilder("user")
            .select("user.amount")
            .where(`user.id = '${userID}'`)
            .getOne();

        // 3. 유저의 돈 업데이트
        await this.userRepository.update(
            { id: user.id }, //
            { amount: user.amount + amount }
        );

        return user;
    }
}
