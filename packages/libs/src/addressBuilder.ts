export const addressBuilder = ({
  postal,
  address1,
  address2,
} : {
  postal?: string
  address1: string,
  address2?: string,
}) => {
  const newPostal = postal ? `〒${postal.slice(0, 3)}-${postal.slice(3)} ` : '';

  return [newPostal, address1, address2].join('');
};