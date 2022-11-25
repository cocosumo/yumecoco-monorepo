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
  } = recProj;

  return {
    custGroupId : custGroupId.value,
    projName : projName.value,
    projTypeName : projTypeName.value,
    customerName : custNames.value,
    projTypeId: projTypeId.value,
  };
};