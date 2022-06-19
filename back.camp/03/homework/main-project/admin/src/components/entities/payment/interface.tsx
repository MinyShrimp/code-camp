const now = new Date();
// prettier-ignore
export const DummyPaymentColumn = {
    id: '', impUid: '', merchantUid: '',
    amount: 0, status: '', createAt: now, 
    userId: '', productId: '',
};
export type IPaymentColumn = typeof DummyPaymentColumn;
