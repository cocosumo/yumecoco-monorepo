
export const initialValues = {
  activeStep: 0,
  prefecture: '',
  city: '',
};

export type TypeOfForm = typeof initialValues;

export type Actions = 
| { type: 'stepback' }
| { type: 'stepnext' }
| { type: 'stepTo', index: number }
| { type: 'setPref', pref: string }
| { type: 'setCity', city: string };


export const addressReducer = (
  state: TypeOfForm, 
  action: Actions,
): TypeOfForm => {

  switch (action.type) {
    case 'stepback' :
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case 'stepnext' : 
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case 'stepTo' : 
      return {
        ...state,
        activeStep: action.index,
      };
    case 'setPref': 
      return {
        ...state,
        prefecture: action.pref,
      };
    case 'setCity': 
      return {
        ...state,
        city: action.city,
      };
    default: return state;
  }

};

