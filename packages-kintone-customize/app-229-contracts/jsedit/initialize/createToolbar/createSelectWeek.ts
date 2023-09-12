import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectWeekId = 'selectWeek';

export const createSelectWeek = async () => {
  createSelect(selectWeekId, 'ハイライト');

};

export const getSelectWeek = () => $(`#${selectWeekId}`);