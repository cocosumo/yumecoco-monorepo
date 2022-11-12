import { getKokoasBaseURLByEnv, kokoasEnvAppIds } from './settings';
describe('settings', () => {
  it('should return kokoas baseURL based on environment', async () =>{

    expect(getKokoasBaseURLByEnv()).toContain(kokoasEnvAppIds.test);
    expect(getKokoasBaseURLByEnv('prod')).toContain(kokoasEnvAppIds.prod);
    expect(getKokoasBaseURLByEnv('dev')).toContain(kokoasEnvAppIds.dev);
    expect(getKokoasBaseURLByEnv('test')).toContain(kokoasEnvAppIds.test);
  });
});