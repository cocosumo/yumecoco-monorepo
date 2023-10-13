import { TForm } from 'kokoas-client/src/pages/projRegisterV2/schema';

export const Content = ({
  data,
}:{
  data: TForm['commRateByRole']
}) => {


  return (
    <table>
      <thead>
        <tr>
          <th 
            align='left'
            style={{
              width: 70,
            }}
          >
            役職
          </th>
          <th
            align='left'
            style={{
              width: 50,
            }}
          >
            紹介料率
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({
          role,
          rate,
        }) => {

          return (
            <tr key={role}>
              <td>
                {role}
              </td>
              <td>
                {rate}
                %
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  
};