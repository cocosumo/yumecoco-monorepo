import { allStoresLabel, eastAreaLabel, westAreaLabel } from '../formGrossProfitTable/config';


const spliceLabel = (stores: string[], label: string) => {
  
  const result = stores;      
  const indexOfLabel = result.indexOf(label);
  if (indexOfLabel !== -1) {
    result.splice(indexOfLabel, 1);
    return result;
  }

  return undefined;
};


export const getStoreList = (stores: string[]) => {

  switch (stores[stores.length - 1]) {
    case allStoresLabel:
      return [allStoresLabel];
    case westAreaLabel:
      return [westAreaLabel];
    case eastAreaLabel:
      return [eastAreaLabel];
    default:
      if ((stores.indexOf(allStoresLabel) === -1)
        && (stores.indexOf(westAreaLabel) === -1)
        && (stores.indexOf(eastAreaLabel) === -1))
        return stores;
  }

  const labelChkAll = spliceLabel(stores, allStoresLabel);
  if (labelChkAll) return labelChkAll;

  const labelChkWest = spliceLabel(stores, westAreaLabel);
  if (labelChkWest) return labelChkWest;

  const labelChkEast = spliceLabel(stores, eastAreaLabel);
  if (labelChkEast) return labelChkEast;

  return stores;
};
