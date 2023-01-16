import {
  Stack,
  Typography,
} from '@mui/material';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { ParsedDaikokuGenka } from 'types';
import { NextButton } from './NextButton';
import { StepCheckInfoTable } from './StepCheckInfoTable';

/**
 * 工事内容を確認する
 */
export const StepCheckInfo = (
  {
    parsedDaikoku,
    handleNext,
    projId,
  }: {
    parsedDaikoku: ParsedDaikokuGenka,
    handleNext: () => void,
    projId?: string
  },
) => {

  const { data: projData } = useProjById(projId ?? '');

  const diffRows = useMemo(
    () => {
      if (!projData || !parsedDaikoku) return [];

      const {
        projName,
      } = projData || {};


      const {
        projName: dkProjName,
      } = parsedDaikoku;

      return [
        [projName?.value, dkProjName],
      ];
    },
    [projData, parsedDaikoku ],
  );

  return (
    <Stack spacing={2}>
      <Typography>
        情報を確認してください
      </Typography>
      <StepCheckInfoTable rows={diffRows} />
      <NextButton
        onClick={handleNext}
      >
        内訳確認へ
      </NextButton>
    </Stack>
  );
};