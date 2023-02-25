import { EmpAffiliations, TAgents } from 'types';

/**
 * 与えられた TAgents または TAgents[] 型のパラメータから、関連会社を解決します。
 *
 * @param {TAgents | TAgents[]} dirtyType - string または string[] で表されたエージェントのタイプ
 * @returns {EmpAffiliations[]} 関連する会社の EmpAffiliations[] 配列
 */
export const resolveAffiliations = (dirtyType: TAgents | TAgents[]) => {
  const agentType = dirtyType instanceof Array ? dirtyType : [dirtyType];

  const result : EmpAffiliations[] = agentType.reduce((acc, curr) => {
    if (curr.includes('yume') && !acc.includes('ゆめてつ')) {
      return [...acc, 'ゆめてつ'];
    } else if (curr.includes('coco') && !acc.includes('ここすも')) {
      return [...acc, 'ここすも'];
    } else if (curr.includes('sutekura') && !acc.includes('すてくら')) {
      return [...acc, 'すてくら'];
    } else {
      return acc;
    }
  }, [] as EmpAffiliations[]);

  return result;
};