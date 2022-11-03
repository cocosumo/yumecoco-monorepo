import { getNewAccessToken } from '../src/auth/getNewAccessToken';
import { loadEnv } from 'config';


(async ()=>{
  loadEnv();

  const result = await getNewAccessToken();

  console.log(result);

})();
