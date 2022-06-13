import React from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';

import { Container, Submit } from '../../../styles/base.styled';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';
import useScript from '../../../hooks/useScript';

const PaymentComponent = (props) => {
    const history = useHistory();

    const params = props.record.params;
    const IMP_UID = 'imp63093514';

    const token = window.localStorage.getItem('access_token');
    const payload = ((token) => {
        const _token = token;
        var base64Url = _token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join(''),
        );

        return JSON.parse(jsonPayload);
    })(token);

    useScript('https://code.jquery.com/jquery-1.12.4.min.js');
    useScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js');

    const requestPay = () => {
        const IMP = window.IMP;
        IMP.init(IMP_UID);
        IMP.request_pay(
            {
                // param
                pg: 'html5_inicis',
                pay_method: 'card',
                name: params.name,
                amount: params.price,
                buyer_email: payload.email,
                buyer_name: payload.name,
            },
            async (rsp) => {
                if (rsp.success) {
                    console.log(rsp);
                    console.log(token);
                    const res = await axios.post(
                        'http://localhost:3000/graphql',
                        {
                            query: `mutation {
                                createPayment(
                                    createPaymentInput: {
                                        impUid: "${rsp.imp_uid}"
                                        merchantUid: "${rsp.merchant_uid}"
                                        amount: ${rsp.paid_amount}
                                        status: ${rsp.status.toUpperCase()}
                                        productID: "${params.sub}"
                                    }
                                ) { id }
                            }`,
                        },
                        {
                            haeders: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    const { data, msg } = TransformGraphQLResponse(res);
                    if (!data) {
                        console.error(msg);
                    } else {
                        console.log(data);
                        history.push('/admin/resources/ProductEntity');
                    }
                } else {
                    console.error(rsp.error_msg);
                }
            },
        );
    };

    return (
        <Container>
            <Submit onClick={requestPay}>Submit</Submit>
        </Container>
    );
};

export default PaymentComponent;
