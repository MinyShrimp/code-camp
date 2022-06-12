import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';

import {
    Container,
    InputGroup,
    Label,
    Input,
    Submit,
} from '../../../styles/base.styled';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

// import { PAYMENT_STATUS } from '../../../../apis/payment/enums/payment.enum';

const CreatePaymentComponent = (props) => {
    const input = useRef({
        merchantUid: '',
        amount: 0,
        status: null,
        productID: '',
    });

    const sendCreatePayment = async () => {
        const createPaymentInput = input.current;
        const res = await axios.post('http://localhost:3000/graphql', {
            query: `mutation { 
                createPayment( 
                    createPaymentInput: { 
                        impUid: "${process.env.IMP_UID}"
                        merchantUid: "${createPaymentInput.merchantUid}"
                        amount: ${createPaymentInput.amount}
                        status: PAID
                        productID: "${createPaymentInput.productID}"
                    } 
                ) { id } }`,
        });

        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            const jwt = data.Login;
            window.localStorage.setItem('access_token', jwt);
            history.push('/admin/resources/UserEntity');
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendCreatePayment();
        }
    };

    return (
        <Container>
            <InputGroup>
                <Label htmlFor="merchantUid">IAMPORT 상품 UID</Label>
                <Input
                    type="text"
                    id="merchantUid"
                    onKeyDown={(e) => onKeyDown(e)}
                    onInput={(e) => {
                        input.current.merchantUid = e.target.value;
                    }}
                ></Input>
            </InputGroup>
            <InputGroup>
                <Label htmlFor="amount">가격</Label>
                <Input
                    type="number"
                    id="amount"
                    onKeyDown={(e) => onKeyDown(e)}
                    onInput={(e) => {
                        input.current.amount = e.target.value;
                    }}
                ></Input>
            </InputGroup>
            <InputGroup>
                <Label htmlFor="productID">상품</Label>
                <Input
                    type="text"
                    id="productID"
                    onKeyDown={(e) => onKeyDown(e)}
                    onInput={(e) => {
                        input.current.productID = e.target.value;
                    }}
                ></Input>
            </InputGroup>
            <Submit>Submit</Submit>
        </Container>
    );
};

export default CreatePaymentComponent;
