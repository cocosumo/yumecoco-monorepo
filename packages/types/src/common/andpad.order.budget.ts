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

/** 予算　(茶色い列) */
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

  /** フォルダ名・明細名 */
  name: string;
  
  /** 備考 */
  memo: null | string;
  planned_budget_memo: null | string;
  fixed_flg: boolean;
  position: number;

  /** 実行予算(数量) */
  quantity: string;

  /** 実行予算(単価) */
  unit_cost: number;

  additional_budget_flg: boolean;
  lock_version: number;
  state: State;
  out_of_planned_budget_flg: boolean;

  /** 予算発注先 */
  contract_name: null | string;
  
  requested_contract_order_cost: null;
  fixed_date: string | null;
  planned_budget_estimate_item?: PlannedBudgetEstimateItem;

  /** 部材・明細 */
  contract_order_item?: ContractOrderItem;

  requested_fixed_authorize_id: null;
  requested_fixed_authorize_read_flg: boolean;
}

/** 発注・経費　(赤い列) */
export interface ContractOrderItem {
  id: number;
  contract_order_id: number;
  client_category_master_id: number;
  client_business_master_id: number;

  /** 発注明細備考 */
  remark: string;

  /** 発注（数量） */
  quantity: number;

  client_unit_master_id: number;

  /** 発注（単価） */
  unit_price: number;

  /** 発注（金額） */
  cost_price: number;

  /** 発注ID */
  edi_contract_order_id: number;

  quantity_for_duplicated_edi: number;
  unit_price_for_duplicated_edi: number;
  cost_price_for_duplicated_edi: number;
  piecework_flg: boolean;

  /** 発注先名 */
  contract_name: string;

  /** 発注日 */
  contract_order_date: Date | null;
  client_accounting_cost_master_id: null;
}

/** 見積 (列) */
export interface PlannedBudgetEstimateItem {
  id: number;
  planned_budget_item_id: number;
  planned_budget_group_id: number;
  material_price: number | null;
  cut_rate: null | string;
  discount_rate: null | string;
  client_unit_master_id: number;

  /** 見積（数量） */
  quantity: string;

  /**　見積（単位） */
  unit: string;

  /** 見積原価(単価) */
  unit_cost_price: number | null;

  /** 見積原価（金額） */
  cost_price: number | null;

  /** 見積金額（単価） */
  unit_estimate_price: number;

  /** 見積金額（金額） */
  estimate_price: number;

}

export type State = (
  | 'adjust_contract_order'
  | 'fixed_delivery'
  | 'fixed_item'
  | 'requested_delivery'
);
