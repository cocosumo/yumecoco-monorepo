import { TMaterials } from '../form';

export const splitEstimatesByProjId = (estimates: TMaterials[]) => {

  const groupedByProjId = estimates.reduce((acc, cur) => {
    if (typeof acc[cur.projId] === 'undefined') {
      acc[cur.projId] = [];
    }
    acc[cur.projId].push(cur);
    return acc;
  }, {} as Record<string, TMaterials[]>);

  return Object.values(groupedByProjId);
};