import { capitalize } from 'lodash';

export const getDbName = (
  dbName: string,
) =>  `DB${capitalize(dbName)}`;