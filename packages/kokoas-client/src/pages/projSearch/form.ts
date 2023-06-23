import { TypeOfForm } from './schema';
import { SearchResult } from './types';

export const initialForm : TypeOfForm = {
  orderBy: 'storeSortNumber' as keyof SearchResult,
  order: 'asc',
  keyword: null,

  includeDeletedCust: false,
  
  custName: null,
  address: null,
  stores: null,
  
  projTypes: null,

  territories: null,

  includeRetired: false,
  cocoAG: null,
  yumeAG: null,

  contractDateFrom: null,
  contractDateTo: null,

  completionDateFrom: null,
  completionDateTo: null,

  
};