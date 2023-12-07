

export const formatStores = (
  store: string,
  stores: DBStores.SavedData[] | undefined,
) => {

  const targetStore = stores?.find(({ uuid }) => uuid.value === store);

  return targetStore?.storeNameShort.value ?? '';
};
