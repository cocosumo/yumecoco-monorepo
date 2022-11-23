

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