const now = new Date();
// prettier-ignore
export const DummyBookImageColumn = {
    id: '',
    isMain: true,
    deleteAt: now,
    uploadImageId: "",
    bookId: ""
};
export type IBookImageColumn = typeof DummyBookImageColumn;
