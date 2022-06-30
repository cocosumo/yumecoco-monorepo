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
  hiddenValue?: string
};

type Options = Option[];