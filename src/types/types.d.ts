declare module '*'
declare module '*.css'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'


interface Props {
  children?: React.ReactNode
}

type Option = {
  label: string | number,
  value?: string
};

type Options = Option[];