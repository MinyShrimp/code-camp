const now = new Date();
// prettier-ignore
export const DummyProductColumn = {
    id: '', name: '', url: '', stock_count: 0, selling_count: 0,
    price: 0, createAt: now, updateAt: now, deleteAt: now,
    bookId: '', productCategoryId: ''
};
export type IProductColumn = typeof DummyProductColumn;
