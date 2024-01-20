


/** 発注
 * 
 * https://andpad.jp/manager/my/orders/#####/contract_orders
 */
export interface AndpadProcurementItem {
  id: number;
  cd: string;
  client_id: number;
  order_id: number;
  contract_id: number;
  contract_billing_id: number;
  first_state: string;
  state: string;
  order_type: string;
  first_out_flg: boolean;
  client_sheet_id: string;
  client_from_id: number;
  client_user_name: string;
  name: string;
  note: string;
  memo: string;
  cost_price_with_tax: number;
  cost_price: number;
  tax_flg: boolean;
  tax_price: number;
  tax_rate: number;
  divide_state: string;
  divide_id: string;
  delivery_cost_price_with_tax: number;
  delivery_cost_price: number;
  delivery_tax_price: number;
  billing_memo: string;
  pay_cache_rate: number;
  order_date: string;
  started_date: string;
  delivery_date: string;
  confirmed_delivery_date: string;
  billing_date: string;
  confirmed_billing_date: string;
  pay_date: string;
  confirmed_pay_date: string;
  actual_cost_price: number;
  published_date: string;
  created_at: string;
  delivery_address_type: string;
  delivery_address: string;
  client_accounting_cost_master_id: string;
  view_state: string;
  view_order_type: string;
  invoice_contract_type: string;
  view_invoice_contract_type: string;
  next_state_which: string;
  contract_name: string;
  order_name: string;
  order_common_id: string;
  order_contracted_cd: string;
  customer_name: string;
  view_create_user_id: string;
  main_rep_user_name: string;
  main_rep_user_group_name: string;
  dist_tax_flg: boolean;
  dist_tax_price: number;
  dist_tax_rate: number;
  dist_cost_price_with_tax: number;
  dist_cost_price: number;
  piecework_flg: string;
  client_accounting_cost_master_name: string;
  client_accounting_master_name: string;
  edi_path: string;
  parent_contract_order_cost_price: number;
  parent_contract_order_cost_price_with_tax: number;
  parent_contract_order_tax_price: number;
}

export type AndpadProcurementResult = AndpadProcurementItem[];
