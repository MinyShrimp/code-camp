import { ApolloServer, gql } from "apollo-server";

import config from "../00-config/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";

/* Datas */
const datas = [];
let autoIncreaseIndex = 0;

// The GraphQL schema
const typeDefs = gql`
    #########################
    # TYPES
    type Board {
        _id      : Int,
        writer   : String,
        title    : String,
        contents : String
    },

    input CreateBoardInput {
        writer   : String!,
        title    : String!,
        contents : String!
    },

    type SendSMS {
        key      : String,
        user_id  : String,
        sender   : String,
        receiver : String,
        msg      : String
    },

    #########################
    # QUERYS
    type Query {
        fetchBoards: [Board]

        fetchBoard(_id: Int): Board
    },

    #########################
    # MUTATIONS
    type Mutation {
        createBoard(
            createBoardInput: CreateBoardInput!
        ): Board

        createTokenOfPhone( phone: String! ): SendSMS
    }
`;

// API
const resolvers = {
    Query: {
        fetchBoards: () => {
            return datas;
        },

        fetchBoard: ( _, args ) => {
            // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
            const _id = args._id ?? ( args._id < 0 ? 0 : args._id );

            // 2. 꺼내온 결과 응답 주기
            return datas[_id];
        }
    },

    Mutation: {
        // parent  : other query or mutation
        // args    : req.body
        // context : 
        // info    : 
        createBoard: ( parent, args, context, info ) => {
            // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
            let newItem = args.createBoardInput;
            newItem["_id"] = autoIncreaseIndex++;
            datas.push(newItem);
        
            // 2. 꺼내온 결과 응답 주기
            return newItem;
        },

        createTokenOfPhone: ( _, args ) => {
            const body = args;
            const myPhone = body.phone;
        
            const isValid = isValidPhoneNumber( myPhone );
            if( isValid ) {
                const myToken = getRandomToken( 6 );
                const responseMsg = sendSMS(myPhone, myToken);

                return responseMsg;
            } else {
                return null;
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,   // GraphQL Schema
    resolvers,  // API
});

server.listen(config.port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
