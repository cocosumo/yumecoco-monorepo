

export const getParams = () => {
  const origParam = window.location.hash.substring(
    window.location.hash.indexOf('?') + 1,
  );

  return  Object.fromEntries(new URLSearchParams(origParam));
};

export const generateParams = (obj: {
  projId?: string
  projEstimateId?: string,
  custGroupId?: string,
}) => {


  // Remove undefined
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);


  return new URLSearchParams(obj).toString();
};