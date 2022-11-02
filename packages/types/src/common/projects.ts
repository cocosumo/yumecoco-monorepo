import { KProjects, IProjects } from './../dbKintone';
import { KeyOfSubtable } from './../utils/KeyOfSubtable';

export type IProjectsAgents = KeyOfSubtable<IProjects['agents']>;
export type IProjectsCustGroup = KeyOfSubtable<IProjects['custGroup']>;
export type KFlatProjects = (KProjects | IProjectsAgents | IProjectsCustGroup);
