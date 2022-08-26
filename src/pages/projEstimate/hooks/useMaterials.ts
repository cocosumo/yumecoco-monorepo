import { usePromise } from '../../../hooks';
import { fetchMajorItems, fetchMiddleItems } from '../api/fetchMaterials';



/**
 * Cached all Materials and expose filter functions.
 *
 * This is to save API calls.
 */
export const useMaterials  = () => {
  const majorItems = usePromise<Estimates.majorItems.SavedData[]>(fetchMajorItems);
  const middleItems = usePromise<Estimates.middleItems.SavedData[]>(fetchMiddleItems);
  const materials = usePromise<Estimates.materials.SavedData[]>(fetchMiddleItems);

  const filterMiddleItems = (majorItemdName: string) => middleItems.data
    ?.filter(({ 大項目名 }) => 大項目名.value === majorItemdName  );

  const filterMaterials = ({
    selMajorItemName, selMiddleItemName,
  } : {
    selMajorItemName?: string,
    selMiddleItemName?: string,
  }) => materials.data
    ?.filter(({ 大項目名, 中項目名 }) =>
      大項目名.value === selMajorItemName ||
      中項目名.value === selMiddleItemName,
    );

  return {
    filterMiddleItems,
    filterMaterials,
    majorItems,
    middleItems,
    materials,
  };

};