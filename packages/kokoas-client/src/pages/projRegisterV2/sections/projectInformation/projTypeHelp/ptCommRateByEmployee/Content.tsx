import { TForm } from 'kokoas-client/src/pages/projRegisterV2/schema';

export const Content = ({
  data,
}:{
  data: TForm['commRateByEmployee']
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
            氏名
          </th>
          <th
            align='left'
            style={{
              width: 50,
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
          commEmpId,
          commEmpName,
          commEmpRole,
          commEmpRate,
        }) => {

          return (
            <tr key={commEmpId}>
              <td>
                {commEmpName}
              </td>
              <td>
                {commEmpRole}
              </td>
              <td>
                {commEmpRate}
                %
              </td>
            </tr>
          );

        
          
        })}
      </tbody>
    </table>
  );
  
};