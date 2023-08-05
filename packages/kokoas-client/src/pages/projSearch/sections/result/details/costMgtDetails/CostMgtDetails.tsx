import { useAndpadCostMgtDataByProjId } from 'kokoas-client/src/hooksQuery';

export const CostMgtDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { data } = useAndpadCostMgtDataByProjId(projId);

  console.log(data);


  return (
    <>
      projId: 
      {' '}
      {projId}
    </>
  );
};