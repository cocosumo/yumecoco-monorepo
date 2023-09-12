import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectMonthId = 'selectMonth';

export const createSelectMonth = () => {
  
  createSelect(selectMonthId, '月');
};

export const getSelectMonth = () => $(`#${selectMonthId}`);