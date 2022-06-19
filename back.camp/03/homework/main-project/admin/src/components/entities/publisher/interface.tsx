const now = new Date();
// prettier-ignore
export const DummyPublisherColumn = {
    id: '', name: '', description: '',
    createAt: now, updateAt: now, deleteAt: now,
};
export type IPublisherColumn = typeof DummyPublisherColumn;
