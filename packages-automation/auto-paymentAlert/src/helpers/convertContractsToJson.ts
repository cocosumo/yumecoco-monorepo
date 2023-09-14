import { IProjects, IStores, IUser } from 'types';
import { ContractRecordType } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';



export const convertContractsToJson = ({
  contracts,
  projects,
  users,
  stores,
}: {
  contracts: ContractRecordType[]
  projects: IProjects[]
  users: IUser[]
  stores: IStores[]
}) => {


  const alertContracts = contracts.map(({
    uuid: contractId,
    projId,
    projType,
    totalContractAmt,
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProjct,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

    const alertTarget = agents?.value.filter(({ value }) => {
      return value.agentType.value === 'cocoAG';
    }).map(({
      value: {
        agentName,
      },
    }) => {
      const userDat = users.find(({
        surName,
        givenName,
      }) => {
        return (agentName.value.indexOf(surName) !== -1) && (agentName.value.indexOf(givenName) !== -1);
      });

      return ({
        code: userDat?.code || '',
        name: userDat?.name || '',
      });
    }) || [{
      code: '',
      name: '',
    }];

    return ({
      contractId: contractId.value,
      projId: projId.value,
      projType: projType.value,
      totalContractAmount: totalContractAmt.value,
      alertTarget: alertTarget,
      territory: store?.area.value,
    }) as PaymentReminder;
  });

  return alertContracts;

};