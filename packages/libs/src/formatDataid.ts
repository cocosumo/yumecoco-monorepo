export const formatDataId = (dataId = '') => {
  console.log('dataId', dataId, dataId.length);
  if (dataId?.length < 8 ) return dataId;

  return dataId.slice(0, 7) + dataId.slice(8);

};