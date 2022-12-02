
export const initialValues = {
  activeStep: 0,
  prefecture: '',
  city: '',
  town: '',
  postalCode: '',
};

export type TypeOfForm = typeof initialValues;

export type Actions =
| { type: 'stepback' }
| { type: 'stepnext' }
| { type: 'stepTo',  payload: number }
| { type: 'setTown', payload: { town: string, postalCode: string } }
| { type: 'setPref', payload: string }
| { type: 'setCity', payload: string };


export const addressReducer = (
  state: TypeOfForm,
  action: Actions,
): TypeOfForm => {

  const {
    activeStep,
  } = state;

  switch (action.type) {
    case 'stepback' :
      return {
        ...state,
        activeStep: activeStep - 1,
      };
    case 'stepnext' :
      return {
        ...state,
        activeStep: activeStep + 1,
      };
    case 'stepTo' :
      return {
        ...state,
        activeStep: action.payload,
      };
    case 'setPref':
      return {
        ...state,
        prefecture: action.payload,
        city: '',
        town: '',
        activeStep: activeStep + 1,
      };
    case 'setCity':
      return {
        ...state,
        city: action.payload,
        town: '',
        activeStep: activeStep + 1,
      };
    case 'setTown':
      return {
        ...state,
        ...action.payload,
        activeStep: 0,
      };
    default: throw new Error('Unhandled dispatch.');
  }

};

