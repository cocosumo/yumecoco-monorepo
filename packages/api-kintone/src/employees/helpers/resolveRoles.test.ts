import { resolveRoles, rolesMap } from './resolveRoles';
import { describe, it, expect } from '@jest/globals';

describe('resolveRoles', () => {
/*   it('should return role of a single agent types', () => {
    expect(resolveRoles('cocoAG')).toMatchObject(rolesMap.cocoAG);
  });
 */
  it('should return roles of agent types', () => {
    console.log(resolveRoles(['cocoAG', 'cocoConst']));
    expect(resolveRoles(['cocoAG', 'cocoConst'])).toStrictEqual(rolesMap.cocoAG);
  });


  it('should return unique roles of agent types with duplicates', () => {
    console.log(resolveRoles(['cocoAG', 'cocoConst']));
    expect(resolveRoles(['cocoAG', 'cocoConst', 'cocoAG', 'cocoAG'])).toStrictEqual(rolesMap.cocoAG);
  });
});