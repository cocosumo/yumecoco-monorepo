
export const initialValues = {
  activeStep: 0,
  area: '',
  prefecture: '',
  city: '',
};

export type TypeOfForm = typeof initialValues;

export type Actions = 
| { type: 'stepback' }
| { type: 'stepnext' }
| { type: 'stepTo', index: number }
| { type: 'setArea', area: string }
| { type: 'setPref', pref: string }
| { type: 'setCity', city: string };


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
        activeStep: action.index,
      };
    case 'setArea': 
      return {
        ...state,
        prefecture: action.area,
        activeStep: activeStep + 1,
      };
    case 'setPref': 
      console.log(action.pref);
      return {
        ...state,
        prefecture: action.pref,
        activeStep: activeStep + 1,
      };
    case 'setCity': 
      return {
        ...state,
        city: action.city,
        activeStep: activeStep + 1,
      };
    default: return state;
  }

};

