import { CalculationEstimateResults } from 'api-kintone';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import { useNavigate } from 'react-router-dom';
import { ParsedDaikokuGenka } from 'types';
import { NextButton } from '../NextButton';
import { convertToKintone } from './helper/convertToKintone';

export const Submit = ({
  handleNext,
  ...others
}: {
  projId: string
  parsedDaikoku: ParsedDaikokuGenka,
  details: CalculationEstimateResults[]
  handleNext: () => void
}) => {

  const {
    projId,
  } = useURLParams();

  const { mutateAsync: saveMutation } = useSaveEstimate();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    handleNext();
    const record = convertToKintone({ ...others });
    const { id } = await saveMutation({
      record,
    });
    navigate(`?${generateParams({
      projEstimateId: id,
      projId,
    })}`);
  };

  return (
    <NextButton
      onClick={handleSubmit}
      variant={'outlined'}
      color={'secondary'}
    >
      登録
    </NextButton>
  );
};