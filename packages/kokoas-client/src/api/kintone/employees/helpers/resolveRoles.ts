import { TAgents, EmpRoles } from 'types';


export const resolveRoles = (dirtyType: TAgents | TAgents[])  => {
  return ([] as TAgents[])
    .concat(dirtyType)
    .reduce((acc, curr) => {
      switch (curr) {
        case 'yumeAG':
          return [...new Set([...acc, ...['主任', '営業', '店長'] as EmpRoles[]])];
        case 'cocoAG':
          return [...new Set([...acc, ...['主任', '営業', '店長', '工務'] as EmpRoles[]])];
        case 'cocoConst':
          return [...new Set([...acc, ...['工務', '営業', '店長', '主任'] as EmpRoles[]])];
        case 'sutekura':
          return [...new Set([...acc, ...['主任', '営業', '店長', '工務'] as EmpRoles[]])];
      }
    }, [] as EmpRoles[]);
};