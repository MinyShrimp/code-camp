import { getDefaultDate } from '../../../functions/functions';

// prettier-ignore
export const DummyProductCategoryColumn = {
    id: '', name: '', createAt: getDefaultDate(), parent: { id: '', name: '' }
};
export type IProductCategoryColumn = typeof DummyProductCategoryColumn;
