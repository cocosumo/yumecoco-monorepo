import { populateSelectMonth } from './populateSelectMonth';
import { populateSelectStore } from './populateSelectStore';
import { populateSelectYear } from './populateSelectYear';

/**
 * Populate static select elements
 * 
 */
export default async function () {

  await populateSelectStore();
  
  populateSelectMonth();
  populateSelectYear();
  
}