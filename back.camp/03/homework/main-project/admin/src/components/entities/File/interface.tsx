const now = new Date();
// prettier-ignore
export const DummyFileColumn = {
    id: '', name: '', path: '', url: '',
    createAt: now, deleteAt: now
};
export type IFileColumn = typeof DummyFileColumn;
