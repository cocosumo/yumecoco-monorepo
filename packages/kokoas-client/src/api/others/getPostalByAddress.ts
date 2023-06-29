import { getAddressDetails } from './getAddressDetails';

export const getPostalByAddress = async (
  address: string,
) => {

  const result = await getAddressDetails(address);

  const { data } = result;

  const postalComponent = data
    .results?.[0]
    .address_components
    ?.find((component) => component.types.includes('postal_code'));


  if (!postalComponent) return '';

  return postalComponent.short_name.replace('-', '');

};