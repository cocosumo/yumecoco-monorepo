import { IProjects } from 'types';
import { TypeOfForm } from '../form';

export const convertProjToForm = (
  recProj: IProjects,
) : Partial<TypeOfForm> => {
  const {
    projName,
    projTypeName,
    custNames,
    custGroupId,
    projTypeId,
    uuid,
  } = recProj;

  return {
    custGroupId : custGroupId.value,
    projId: uuid.value,
    projName : projName.value,
    projTypeName : projTypeName.value,
    customerName : custNames.value,
    projTypeId: projTypeId.value,
  };
};