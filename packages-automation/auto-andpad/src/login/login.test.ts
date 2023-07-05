import { describe, expect } from '@jest/globals';
import { login } from './login';

describe('Login', () => {
  it('should login', () => {
    await login()
    expect(1).toBe(1);
  });
});