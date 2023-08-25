export interface AndpadBudgetResult {
  message: null;
  data: Datum[];
}

export interface Datum {
  id: number;
  parent_planned_budget_group_id: number | null;
  name: string;
  position: number;
  memo: null | string;
  out_of_planned_budget_flg: boolean;
  planned_budget_items: PlannedBudgetItem[];
  child_planned_budget_groups: Datum[];
  costs?: Costs;
}

export interface Costs {
  name: string;
  cost_items: CostItem[];
}

export interface CostItem {
  id: number;
  name: string;
  cost_price: number;
  order_date: Date;
  note: null;
}

export interface PlannedBudgetItem {
  id: number;
  planned_budget_group_id: number;
  contract_id: number | null;
  client_unit_master_id: number | null;
  client_business_master_id: number;
  client_category_master_id: number;
  started_planned_date: null;
  worked_planned_date: null;
  requested_authorize_id: null;
  name: string;
  memo: null | string;
  planned_budget_memo: null | string;
  fixed_flg: boolean;
  position: number;
  quantity: string;
  unit_cost: number;
  additional_budget_flg: boolean;
  lock_version: number;
  state: State;
  out_of_planned_budget_flg: boolean;
  contract_name: null | string;
  requested_contract_order_cost: null;
  fixed_date: string | null;
  planned_budget_estimate_item?: PlannedBudgetEstimateItem;
  contract_order_item?: ContractOrderItem;
  requested_fixed_authorize_id: null;
  requested_fixed_authorize_read_flg: boolean;
}

export interface ContractOrderItem {
  id: number;
  contract_order_id: number;
  client_category_master_id: number;
  client_business_master_id: number;
  remark: string;
  quantity: number;
  client_unit_master_id: number;
  unit_price: number;
  cost_price: number;
  edi_contract_order_id: number;
  quantity_for_duplicated_edi: number;
  unit_price_for_duplicated_edi: number;
  cost_price_for_duplicated_edi: number;
  piecework_flg: boolean;
  contract_name: string;
  contract_order_date: Date | null;
  client_accounting_cost_master_id: null;
}

export interface PlannedBudgetEstimateItem {
  id: number;
  planned_budget_item_id: number;
  planned_budget_group_id: number;
  material_price: number | null;
  unit_estimate_price: number;
  cut_rate: null | string;
  discount_rate: null | string;
  quantity: string;
  unit_cost_price: number | null;
  client_unit_master_id: number;
  unit: string;
  estimate_price: number;
  cost_price: number | null;
}

export type State = (
  | 'adjust_contract_order'
  | 'fixed_delivery'
  | 'fixed_item'
  | 'requested_delivery'
);
