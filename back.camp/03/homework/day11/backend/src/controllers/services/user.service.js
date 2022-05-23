import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

/**
 * User Service
 */
class UserService {
    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Utils => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 주민번호 뒷자리 Masking
     *
     * @param {string} personal
     * @returns String
     */
    getPersonal = (personal) => {
        return `${personal.split("-")[0]}-*******`;
    };

    /**
     * 비밀번호 암호화
     * @param {string} password
     * @return Promise<[password, salt]>
     */
    getHashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.hash(password, salt);
        return [pwd, salt];
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Controller => Model
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 새로운 유저 생성
     * @param {object} user
     * @returns 생성된 User ID
     */
    createUser = async (user) => {
        const newUser = new User({
            name: user.name,
            email: user.email,
            personal: user.personal,
            prefer: user.prefer,
            pwd: user.pwd,
            salt: user.salt,
            phone: user.phone,
            createAt: user.createAt,
            deleteAt: null,
            og: { ...user.og },
        });
        await newUser.save();

        return newUser._id;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Model => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 모든 유저 찾기
     * @returns 모든 User Data
     */
    getAllUser = async () => {
        const result = await User.find();
        return result;
    };

    /**
     * 핸드폰 번호를 이용해 유저 찾기
     * @param {string} phone
     * @returns 핸드폰 번호로 찾은 User Data
     */
    getUserByPhone = async (phone) => {
        const result = await User.findOne({ phone: phone });
        return result;
    };
}

export default UserService;
