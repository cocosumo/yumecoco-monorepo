export interface AndpadProcurementMonthly {
  data: Data;
}

export interface Data {
  conditions: Conditions;
  months:     string[];
  groups:     Groups;
  pieceworks: any[];
  summaries:  Summary[];
  totals:     Summary[];
}

export interface Conditions {
  contract_order_state_range_start: number;
  contract_order_state_range_end:   number;
  base_date_type:                   string;
}

export interface Groups {
  id:                              number;
  name:                            string;
  position:                        number;
  memo:                            null | string;
  parent_planned_budget_group_id:  number | null;
  total_planned_budget_cost:       number;
  items_total_planned_budget_cost: number;
  total_contract_order_cost:       number;
  items_total_contract_order_cost: number;
  months:                          Month[];
  contracts:                       Contract[];
  children:                        Groups[];
}

export interface Contract {
  id:                              number | null;
  name:                            string;
  items_total_planned_budget_cost: number;
  items_total_contract_order_cost: number;
  items:                           Item[];
  months:                          Month[];
}

export interface Item {
  planned_budget_item: PlannedBudgetItem;
  months:              Month[];
}

export interface Month {
  month:     string;
  price:     number;
  piecework: boolean;
}

export interface PlannedBudgetItem {
  id:                        number;
  planned_budget_group_id:   number;
  contract_id:               number | null;
  client_unit_master_id:     number;
  name:                      string;
  memo:                      string;
  planned_budget_memo:       null;
  position:                  number;
  quantity:                  string;
  unit_cost:                 number;
  state:                     State;
  out_of_planned_budget_flg: boolean;
  unit:                      string;
  cost:                      number;
  contract_name:             string;
  contract_order_cost:       number | null;
}

export enum State {
  FixedItem = 'fixed_item',
  RequestedContractOrder = 'requested_contract_order',
  RequestedDelivery = 'requested_delivery',
}

export interface Summary {
  month: string;
  price: number;
}