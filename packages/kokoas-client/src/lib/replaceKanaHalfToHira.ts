import { replaceKanaHalfToFull } from './replaceKanaHalfToFull';
import { replaceKanaToHira } from './replaceKanaToHira';


export const replaceKanaHalfToHira = (str: string) => replaceKanaToHira(replaceKanaHalfToFull(str));
