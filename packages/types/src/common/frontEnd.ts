export type Option = {
  label: string | number,
  value: string,
  secondaryLabel?: string | null,
  hiddenValue?: any
};

export type OptionNode = {
  value: string | number,
  key: string,
  component: React.ReactNode
};

export type Options = Option[];