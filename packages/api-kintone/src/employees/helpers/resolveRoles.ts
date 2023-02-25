import { TAgents, EmpRoles } from 'types';

type RolesMap = {
  [key in TAgents]: EmpRoles[];
};

const rolesMap: RolesMap = {
  'yumeAG': ['主任', '営業', '店長'],
  'cocoAG': ['主任', '営業', '店長', '工務'],
  'cocoConst': ['工務', '営業', '店長', '主任'],
  'sutekura': ['主任', '営業', '店長', '工務'],
};


export const resolveRoles = (dirtyType: TAgents | TAgents[]) => {
  const types =  dirtyType instanceof Array ? dirtyType : [dirtyType];

  const roles = types.reduce((acc: EmpRoles[], type: TAgents) => {
    const typeRoles = rolesMap[type];
    if (typeRoles) {
      return [...acc, ...typeRoles];
    }
    return acc;
  }, []);

  return [...new Set(roles)];
};