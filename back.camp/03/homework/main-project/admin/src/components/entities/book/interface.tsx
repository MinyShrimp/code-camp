const now = new Date();
// prettier-ignore
export const DummyBookColumn = {
    id: '',
    title: "",
    subtitle: "",
    description: "",
    page: 0,
    isbn_10: "",
    isbn_13: "",
    publishAt: now,
    createAt: now,
    updateAt: now,
    deleteAt: now,
    publisherId: '',
    authorId: ''
};
export type IBookColumn = typeof DummyBookColumn;
