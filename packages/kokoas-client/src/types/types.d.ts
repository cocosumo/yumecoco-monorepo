

type Option = {
  label: string | number,
  value: string,
  secondaryLabel?: string | null,
  hiddenValue?: any
};

type OptionNode = {
  value: string | number,
  key: string,
  component: React.ReactNode
};

type Options = Option[];

type Order = 'asc' | 'desc';

interface EnhancedTableProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: T) => void;
  order: Order;
  orderBy: string;
}