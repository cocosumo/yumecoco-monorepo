import { CalculationEstimateResults } from 'api-kintone';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
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
  const { mutateAsync: saveMutation } = useSaveEstimate();

  const handleSubmit = async () => {
    handleNext();
    const record = convertToKintone({ ...others });
    const result = await saveMutation({
      record,
    });

    console.log(result);

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