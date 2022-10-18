import axios from 'axios';
import { yumecocoDocusign } from '../../config/settings';


describe('sendContract', () => {
  it('should send contract', async () => {

    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;

    const data : ReqSendContract = {
      projEstimateId: '25',
      userCode: 'RPA03',
      signMethod: 'electronic',
    };

    const result = await axios.post(endpoint, data);



    expect(result).toMatchSnapshot();
  }, 30000);
});