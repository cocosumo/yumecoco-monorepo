
export interface IProjTypeShow  {
  id: string,
  name: string,
}

export interface IProjTypeGoals {
  [key: string]: {
    monthGoal: number,
    yearGoal: number,
  }
}

export const today = new Date();


export const projTypesToShow: IProjTypeShow[] = [
  {
    id: 'd0865079-7ea1-4752-838d-e11f84bb0620',
    name: '新築工事',
  },
  {
    id: '68ee1fa3-93be-43a7-a3d1-e5a77bb1cc43',
    name: '新築付帯工事',
  },
  {
    id: 'db9372e0-6fc7-47a0-a958-f953dc33e323',
    name: '太陽光',
  },
  {
    id: 'fa331f6a-b961-49f3-9512-26200cb7b580',
    name: 'リフォーム工事',
  },
];