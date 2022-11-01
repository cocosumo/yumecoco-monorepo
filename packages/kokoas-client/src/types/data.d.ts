/**
 * Warning: Conflict with server types exists.
 * 
 * Fix when migrated to monorepo. ~ras
 */




/** projects */
type KeyOfProjectDetails = keyof ProjectDetails.SavedData;
type TypeOfProjectDetails = ProjectDetails.SavedData;

/** prospect 見込み */
type TypeOfProjectProspect = Pick<TypeOfProjectDetails, 'rank' | 'estatePurchaseDate' | 'schedContractPrice' | 'memo' | 'planApplicationDate' | 'schedContractDate'>;
type TypeOfProjectProspectValues = Record<keyof TypeOfProjectProspect, { value:  string | number | boolean }>;

/** custGroup 顧客グループ */
type TypeOfCustomerGroup = CustomerGroupTypes.SavedData;
type KeyOfCustomerGroup  = keyof TypeOfCustomerGroup;
type KeyOfCustomerGroupMembers = keyof TypeOfCustomerGroup['members']['value'][0]['value'];
type KeyOfCustomerGroupAG = keyof TypeOfCustomerGroup['agents']['value'][0]['value'];

type KeyOfCustGroupAll =
| KeyOfCustomerGroup
| KeyOfCustomerGroupMembers
| KeyOfCustomerGroupAG;


/** projEstimates */
type TypeOfProjEstimates = Estimates.main.SavedData;
// type KeyOfProjEstimates = keyof TypeOfProjEstimates; 

type TProjRank = 'A' | 'B' | 'C' | 'D' | '';

