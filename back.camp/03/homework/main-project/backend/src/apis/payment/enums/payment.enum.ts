import { registerEnumType } from '@nestjs/graphql';

export const PAYMENT_STATUS = {
    PAYMENT: 'PAYMENT',
    CANCEL: 'CANCEL',
} as const;
export type PAYMENT_STATUS = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

registerEnumType(PAYMENT_STATUS, { name: 'PAYMENT_STATUS' });
