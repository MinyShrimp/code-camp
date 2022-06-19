
import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListPaymentColumns, ShowPaymentColumns } from './columns';

export function PaymentIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Payment');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/payments"
            ListColumns={ListPaymentColumns}
            ShowUrl="/admin/payment"
            ShowColumns={ShowPaymentColumns}
        />
    );
}

