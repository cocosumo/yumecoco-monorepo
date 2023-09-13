import { createSelect } from './createSelect';
import $ from 'jquery';

export const selectYearId = 'selectYear';

export const createSelectYear = () => {
  createSelect(selectYearId, '年');
};

export const getSelectYear = () => $(`#${selectYearId}`);