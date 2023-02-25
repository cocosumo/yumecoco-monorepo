import { EmpAffiliations, TAgents } from 'types';

/**
 * 与えられた TAgents または TAgents[] 型のパラメータから、関連会社を解決します。
 */
export const resolveAffiliations = (dirtyType: TAgents | TAgents[]) => {
  const agentType = dirtyType instanceof Array ? dirtyType : [dirtyType];

  return agentType.reduce<EmpAffiliations[]>((acc, curr) => {
    if (curr.includes('yume') && !acc.includes('ゆめてつ')) {
      return [...acc, 'ゆめてつ'];
    } else if (curr.includes('coco') && !acc.includes('ここすも')) {
      return [...acc, 'ここすも'];
    } else if (curr.includes('sutekura') && !acc.includes('すてくら')) {
      return [...acc, 'すてくら'];
    } else {
      return acc;
    }
  }, []);
};