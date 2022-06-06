import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import SignupInput from "./dto/signup.input";
import UserEntity from "./entities/user.entity";

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll() {
        return await this.userRepository.find({});
    }

    async create(
        input: SignupInput //
    ) {
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

        return await this.userRepository.save({
            ...input,
        });
    }
}
