const now = new Date();
// prettier-ignore
export const DummyReviewColumn = {
    id: '', contents: '', star: 0.0, like: true, 
    createAt: now, updateAt: now, deleteAt: now,
    productId: '', userId: ''
};
export type IReviewColumn = typeof DummyReviewColumn;
