import { CalculationEstimateResults } from 'api-kintone';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useProjById, useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import { useNavigate } from 'react-router-dom';
import { ParsedDaikokuGenka } from 'types';
import { NextButton } from '../NextButton';
import { convertToKintone } from './helper/convertToKintone';

export const Submit = ({
  handleNext,
  projId,
  ...others
}: {
  projId: string
  parsedDaikoku: ParsedDaikokuGenka,
  details: CalculationEstimateResults[]
  handleNext: () => void
}) => {

  const { mutateAsync: saveMutation } = useSaveEstimate();
  const { data: projData } = useProjById(projId);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!projData) return;
    const record = convertToKintone({ ...others, projId });
    const { id } = await saveMutation({
      record,
      relatedData: {
        projDataId: projData.dataId.value,
      },
    });

    if (id) {
      handleNext();
      navigate(`?${generateParams({
        projEstimateId: id,
        projId,
      })}`);
    }
  };

  return (
    <NextButton
      onClick={handleSubmit}
      variant={'outlined'}
      color={'secondary'}
      disabled={!projData}
    >
      登録
    </NextButton>
  );
};