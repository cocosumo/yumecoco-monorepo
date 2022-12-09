import { IProjects, ICustgroups, TAgents } from 'types';
import { TypeOfForm } from '../form';

export const convertProjToForm = ({
  recProj,
  recCustGroup,
} : {
  recProj: IProjects,
  recCustGroup: ICustgroups
}): Partial<TypeOfForm> => {
  const {
    uuid,
    projName,
    custGroupId,
    store,
    agents: projOfficers,
    postal: pPostal,
    address1: pAddress1,
    address2: pAddress2,
  } = recProj;

  const {
    members,
    agents: custGroupAgents,
  } = recCustGroup;

  const allCustNames = members.value.map(({ value: { customerName } }) => customerName.value ).join(', ');
  const mainCust = members.value[0].value;
  const {
    address1, address2, postal,
  } = mainCust;

  const cocoAG = custGroupAgents.value
    .filter(item => (item.value.agentType.value as TAgents) === 'cocoAG' )
    ?.map(item => item.value.employeeName.value)
    .join('、 ') ?? '';

  const yumeAG = custGroupAgents.value
    .filter(item => (item.value.agentType.value as TAgents) === 'yumeAG' )
    ?.map(item => item.value.employeeName.value)
    .join('、 ') ?? '';

  const cocoConst = projOfficers.value
    ?.map(item => item.value.agentName.value)
    .join('、');

  return {

    projId: uuid.value,
    custGroupId: custGroupId.value,
    projName: projName.value,

    custName: allCustNames,
    custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
    store: store.value,

    cocoAG,
    yumeAG,
    cocoConst,

    projAddress: `〒${pPostal.value} ${pAddress1.value}${pAddress2.value}`,

  };

};