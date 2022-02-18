import { UpdateRecordParam } from '../../restapi';

export const dtArrOfCusts : UpdateRecordParam[] = [{
  id: '241',
  record: {
    fullName: { value: '何も' },
    contacts: {
      value: [
        { id: '', value: {
          classification: { value: '母' },
          contactType: { value: '電話' },
          contactValue: { value: 'test' },
        } },
      ],
    },
  },
}];

export const dtGroup: UpdateRecordParam = {
  id: '121',
  record: {
    storeId : { value: 21 },
  },
};