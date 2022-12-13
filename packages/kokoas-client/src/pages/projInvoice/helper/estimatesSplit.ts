import { TMaterials } from '../form';

export const estimatesSplit = (estimates: TMaterials[]) => {

  const estimatesCopy = [...estimates];
  const estimatesBkup = estimatesCopy;

  /* 工事番号毎に配列を分割する */
  /* 初期化処理 */
  let startIdx = 0; // 配列分割用の開始番号
  let startProjId = estimatesCopy[0].projId; // 比較用の工事番号

  let sortContracts = estimatesCopy.reduce((acc, cur, idx) => {

    if (startProjId === cur.projId) return acc; // 工事番号が同じ間は分割しない

    // 比較用変数を更新する
    const backupIdx = startIdx;
    startIdx = idx;
    startProjId = cur.projId;

    return [...acc, estimatesBkup.slice(backupIdx, startIdx)];

  }, []);

  // 最後の工事番号分を配列に格納する
  sortContracts = [...sortContracts, estimatesBkup.slice(startIdx)];

  return sortContracts;
};