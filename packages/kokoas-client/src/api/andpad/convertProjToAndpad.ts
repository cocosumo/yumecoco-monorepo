import { getContractByProjId, getCustGroupById, getCustomersByIds, getProjById } from 'api-kintone';
import { getAddressByPostal } from '../others';

export const convertProjToAndpad = async (projId: string) => {

  const [projRec, estData] = await Promise.all([
    getProjById(projId),
    getContractByProjId(projId),
  ]);

  const custGroupRec = await getCustGroupById(projRec?.custGroupId.value);
  const firstCustId = custGroupRec?.members.value[0].value.custId.value;
  const firstCust = (await getCustomersByIds([firstCustId]))[0];

  const {
    prefecture: projPrefecture,
  } = await getAddressByPostal(projRec?.postal.value || '') ?? {};

  const {
    prefecture: custPrefecture,
  } = await getAddressByPostal(firstCust?.postalCode.value || '') ?? {};

};