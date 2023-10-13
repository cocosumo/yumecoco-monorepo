import { TypeOfForm } from './schema';
import { SearchResult } from './types';

export const initialForm : TypeOfForm = {
  orderBy: 'createdAt' as keyof SearchResult,
  order: 'desc',
  keyword: null,

  includeDeleted: false,
  
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

  deliveryDateFrom: null,
  deliveryDateTo: null,

  paidDateFrom: null,
  paidDateTo: null,

  completionDateFrom: null,
  completionDateTo: null,

  
};