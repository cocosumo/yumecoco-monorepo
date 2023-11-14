import { ICustgroups, ICustomers } from 'types';
import { v4 as uuidV4 } from 'uuid';
import { TForm } from '../schema';

export const convertToForm = (
  recCustGroup: ICustgroups,
  recsCustomers: ICustomers[],
) : TForm => {

  /* Get main record */
  const {
    uuid, 
    agents, 
    storeId,
    isDeleted,
    memo,
    members,
  } = recCustGroup ;

  /* Group cocoAG and yumeAG */
  const Ags = agents.value.reduce((accu, curr) => {
    const { value: { agentType, employeeId } } = curr;
    if (agentType.value.includes('cocoA')) {
      return { ...accu, cocoAGs: [...accu.cocoAGs, employeeId.value  ] };
    } else if (agentType.value.includes('yumeA')) {
      return { ...accu, yumeAGs: [...accu.yumeAGs, employeeId.value  ] };
    }
  }, { cocoAGs: [] as string[], yumeAGs: [] as string[] });

  /* Map the result to the form */
  return {
    memo: memo.value,
    custGroupId: uuid.value,
    isDeleted: Boolean(+isDeleted.value),
    store: storeId.value,
    cocoAG1: Ags?.cocoAGs?.[0] || '',
    cocoAG2: Ags?.cocoAGs?.[1] || '',
    yumeAG1: Ags?.yumeAGs?.[0] || '',
    yumeAG2: Ags?.yumeAGs?.[1] || '',
    customers: members?.value.map(({ value: cust }) => {
      const custRec = recsCustomers.find((c) => c.uuid.value === cust.custId.value);
      const {
        uuid: custId,
        $revision: custRevision,
        fullName, fullNameReading, gender, birthYear, birthDay, birthMonth,
        postalCode, address1, address2,
        contacts,
      } = custRec || {};


      const tels = contacts?.value.filter(c => c.value.contactType.value === 'tel');
      const email = contacts?.value.find(c => c.value.contactType.value === 'email');

      return {
        key: uuidV4(),
        custId: custId?.value || '',
        index: cust.index.value || '',
        revision: custRevision?.value  || '',
        custName: fullName?.value || '',
        custNameReading: fullNameReading?.value || '',
        gender: gender?.value || '',
        birthYear: birthYear?.value || '',
        birthMonth: birthMonth?.value || '',
        birthDay: birthDay?.value || '',
        postal: postalCode?.value || '',
        address1: address1?.value || '',
        address2: address2?.value || '',

        phone1: tels?.[0].value.contactValue.value || '',
        phone1Rel: tels?.[0].value.relation.value || '',
        phone1Name: tels?.[0].value.contactName.value || '',
        

        phone2: tels?.[1].value.contactValue.value || '',
        phone2Rel: tels?.[1].value.relation.value || '',
        phone2Name: tels?.[1].value.contactName.value || '',

        email: email?.value.contactValue.value || '',
        emailRel: email?.value.relation.value || '',
        emailName: email?.value.contactName.value || '',

        isSameAddress: Boolean(+cust.isSameAsMain.value),
        
      };
    }),
  };
};