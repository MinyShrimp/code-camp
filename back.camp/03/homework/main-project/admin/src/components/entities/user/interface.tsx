const now = new Date();
// prettier-ignore
export const DummyUserColumn = {
    id: '', name: '', email: '', pwd: '', point: 0, isAdmin: true,
    loginAt: now, logoutAt: now, isLogin: true,
    createAt: now, updateAt: now, deleteAt: now,
};
export type IUserColumn = typeof DummyUserColumn;
