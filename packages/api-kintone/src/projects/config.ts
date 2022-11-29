import { KProjects } from './../../../types/src/dbKintone';
import { AppIds } from 'config';
import { IProjects } from 'types';

export const appId = AppIds.projects;
export type RecordType = IProjects;
export type RecordKey = KProjects;
export const dataIdPadding = 4;
export const dataIdPrefix = 'C'; // storeCode-dataIdMidFix-("yy")(連番,5桁)