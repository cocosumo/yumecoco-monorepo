export const getProjNumJa = (
  storeNameShort: string | undefined,
  dataId: string,
) => {
  if (!storeNameShort || !dataId) return '';

  const [_, dataId1, dataId2] = dataId.split('-');

  return `${storeNameShort} ${dataId1}${dataId2}`;

};
