/**
 * @deprecated use KeyOfProjectDetails
 */
type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;

/**
 * @deprecated use TypeOfProjectDetails
 */
type ConstructionDetailsValues = Partial<Record<KeyOfProjectDetails, string | number | boolean>>;

type KeyOfProjectDetails = keyof ConstructionDetails.SavedData;
type TypeOfProjectDetails = ConstructionDetails.SavedData;


type TypeOfProjectProspect = Pick<TypeOfProjectDetails, 'rank' | 'estatePurchaseDate' | 'schedContractPrice' | 'memo' | 'planApplicationDate' | 'schedContractDate'>;
type TypeOfProjectProspectValues = Record<keyof TypeOfProjectProspect, { value:  string | number | boolean }>;



/* Customer Grouo */

type TypeOfCustomerGroup = CustomerGroupTypes.SavedData;
type KeyOfCustomerGroup  = keyof TypeOfCustomerGroup;
type KeyOfCustomerGroupItem = keyof TypeOfCustomerGroup['members']['value'][0]['value'];

type TProjRank = 'A' | 'B' | 'C' | 'D' | '';

