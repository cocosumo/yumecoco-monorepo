import { TContact, TRelation } from 'types';
import { RecordType } from '../config';

export const getContactByType = (
  contacts: RecordType['contacts'], 
  type: TContact,
) => contacts.value
  ?.filter(({ value: { contactType } }) => (contactType.value as TContact) === type)
  .map(({ value: { contactValue, relation, contactName } }) => {
    let resolveRelation = '';
    if (relation.value && (relation.value as TRelation) !== '契約者') {

      const resolveName = contactName.value ? `：${contactName.value}` : '';
      resolveRelation = `（${relation.value}${resolveName}）`;
    }

    return `${contactValue.value} ${resolveRelation ? resolveRelation : '' }`.trim();
  });
