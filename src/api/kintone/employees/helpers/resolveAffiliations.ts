import { EmpAffiliations, EmployeeType } from '../../../../types/commonTypes';

export const resolveAffiliations = (dirtyType: EmployeeType | EmployeeType[]) => {

  return ([] as string[])
    .concat(dirtyType)
    .reduce((acc, curr)=>{

      if (curr.includes('yume') && !acc.includes('ゆめてつ')) {
        return [...new Set([...acc, 'ゆめてつ'])];
      }
      if (curr.includes('coco') && !acc.includes('ここすも')) {
        return [...new Set([...acc, 'ここすも'])];
      }
      if (curr.includes('sutekura') && !acc.includes('すてくら')) {
        return [...new Set([...acc, 'すてくら'])];
      }

      return acc;
    }, [] as EmpAffiliations[]);
};