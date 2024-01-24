import { getAllConferenceContracts } from './getAllConferenceContracts';


const selectStr = '大黒さん'; 

export const getDaikokuContracts = () => {
  return getAllConferenceContracts({
    condition: `抽出箇所 in ("${selectStr}")`,
  });
};
