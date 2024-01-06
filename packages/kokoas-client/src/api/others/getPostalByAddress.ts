import { getAddressDetails } from './getAddressDetails';

export const getPostalByAddress = async (
  address: string,
) => {

  try {

    let resolvedPostal = '';
    let normalizedAddress = address;
    /** 
     * We have to loop through the address and remove the last character
     * to help google Api resolve the postal code.
     * 
     * Google API won't resolve postal code if the addess contains invalid elements
     * 
     * We might need to improve this to cover more cases.
     */
    while (!resolvedPostal && normalizedAddress.length > 0) {
      const result = await getAddressDetails(normalizedAddress);

      const { data } = result;

      const postalComponent = data
        .results?.[0]
        .address_components
        ?.find((component) => component.types.includes('postal_code'));

      if (postalComponent) {
        resolvedPostal = postalComponent.short_name.replace('-', '');
      }

      normalizedAddress = normalizedAddress.slice(0, -1);
    }

    return resolvedPostal;

    


  } catch (err) {
    console.error(`Error: getPostalByAddress. Params: ${address}. ${err?.message} `);
    return '';
  }

};