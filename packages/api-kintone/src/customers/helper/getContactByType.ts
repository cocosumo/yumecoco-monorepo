import { TContact, TRelation } from 'types';
import { RecordType } from '../config';

export const getContactByType = (
  contacts: RecordType['contacts'], 
  type: TContact,
) => contacts.value
  ?.filter(({ value: { contactType } }) => (contactType.value as TContact) === type)
  .map(({ value: { contactValue, relation } }) => {
    let resolveRelation = '';
    if (relation.value && (relation.value as TRelation) !== '契約者') {
      resolveRelation = `(${relation.value})`;
    }

    return `${contactValue.value} ${resolveRelation ? resolveRelation : '' }`.trim();
  });
