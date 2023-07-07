
export const postalBuilder = (postal: string | undefined) => {
  if (!postal) return '';
  console.log('entered', postal);
  const normalizedPostal = postal.replace('-', '');

  console.log('normalizedPostal', `〒${normalizedPostal.slice(0, 3)}-${normalizedPostal.slice(3)} `);

  return `〒${normalizedPostal.slice(0, 3)}-${normalizedPostal.slice(3)} `;
};

export const addressBuilder = ({
  postal,
  address1,
  address2,
}: {
  postal?: string;
  address1: string;
  address2?: string;
}): string => {

  const newPostal = postalBuilder(postal);

  return [newPostal, address1, address2].filter(Boolean).join('');
};






