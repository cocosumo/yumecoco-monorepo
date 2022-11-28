import { IProjects } from 'types';
import { TypeOfForm } from '../form';

export const convertProjToForm = (
  recProj: IProjects,
) : Partial<TypeOfForm> => {
  const {
    custNames,
    custGroupId,
    dataId,
    projName,
    projTypeId,
    projTypeName,
    uuid,
  } = recProj;

  return {
    custGroupId : custGroupId.value,
    customerName : custNames.value,
    projDataId: dataId.value,
    projId: uuid.value,
    projName : projName.value,
    projTypeId: projTypeId.value,
    projTypeName : projTypeName.value,
  };
};