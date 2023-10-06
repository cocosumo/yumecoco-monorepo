import { TAgents, EmpRoles } from 'types';

type RolesMap = {
  [key in TAgents]: EmpRoles[];
};

export const rolesMap: RolesMap = {
  'yumeAG': ['取締役', '主任', '営業', '店長', '店長代理'],
  'cocoAG': ['営業', '店長', '工務', '主任'],
  'cocoConst': ['営業', '店長', '工務', '主任'], // 当面、cocoAGと一緒ですが、変わるかもしれませんので、残しておきます。
  //'sutekura': ['主任', '営業', '店長', '工務'],
};

export const resolveRoles = (dirtyType: TAgents | TAgents[]) => {
  const agentTypes =  dirtyType instanceof Array ? dirtyType : [dirtyType];

  const roles = agentTypes.reduce<EmpRoles[]>((acc, type: TAgents) => {
    const typeRoles = rolesMap[type];
    if (typeRoles) {
      return [...acc, ...typeRoles];
    }
    return acc;
  }, []);

  return [...new Set(roles)];
};