
declare module '*.css'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'

declare module 'koyomi'


interface Props {
  children?: React.ReactNode
}

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

type Unpack<T> = T extends Promise<infer U> ? U : T;
