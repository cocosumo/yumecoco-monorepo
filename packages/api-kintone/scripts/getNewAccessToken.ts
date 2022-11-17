import { getNewAccessToken } from '../src/@auth/getNewAccessToken';


(async ()=>{

  const result = await getNewAccessToken();
  console.info('Success. This expires in 1 hr.');
  console.info(result);
})();
