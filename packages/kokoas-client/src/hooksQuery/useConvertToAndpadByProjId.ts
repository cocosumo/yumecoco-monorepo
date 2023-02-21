import { useQuery } from '@tanstack/react-query';
import { getCustGroupById, getCustomersByIds, getProjById } from 'api-kintone';
import { getContractByProjId } from 'api-kintone/src/estimates/getContractByProjId';
import { AppIds } from 'config';
import { getAddressByPostal } from '../api';


export const useConvertToAndpadByProjId = (projId = '') => {

  return useQuery(
    ['andpad', AppIds.projects, projId],
    async () => {

      const [projRec, estData] = await Promise.all([
        getProjById(projId),
        getContractByProjId(projId),
      ]);

      const custGroupRec = await getCustGroupById(projRec?.custGroupId.value);
      const firstCustId = custGroupRec?.members.value[0].value.custId.value;
      const firstCustRec = (await getCustomersByIds([firstCustId]))[0];

      const {
        prefecture: projPrefecture,
      } = await getAddressByPostal(projRec?.postal.value || '') ?? {};

      const {
        prefecture: custPrefecture,
      } = getAddressByPostal(firstCust?.postalCode.value || '') ?? {};
    },
    {
      enabled: !!projId,
    },
  );
};