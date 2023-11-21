import { IProjects } from 'types';
import { TForm } from '../schema';

export const convertProjToForm = (
  recProj: IProjects,
) : Partial<TForm> => {
  const {
    custGroupId,
    dataId,
    projName,
    projTypeId,
    projTypeName,
    uuid,
  } = recProj;

  return {
    custGroupId : custGroupId.value,
    // customerName : custNames .value,
    projDataId: dataId.value,
    projId: uuid.value,
    projName : projName.value,
    projTypeId: projTypeId.value,
    projTypeName : projTypeName.value,
  };
};