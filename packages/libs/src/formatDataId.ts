export function formatDataId(dataId?: string) {
  if (!dataId) return '';

  // Split the dataId string by '-' character
  const parts = dataId.split('-');

  if (parts.length < 3) {
    return dataId;
  }
  
  // Combine the first three parts and add the rest parts if any
  const formattedId = parts[0] + '-' + parts[1] + parts[2] + (parts.length > 3 ? '-' + parts.slice(3).join('-') : '');
  
  return formattedId;
}