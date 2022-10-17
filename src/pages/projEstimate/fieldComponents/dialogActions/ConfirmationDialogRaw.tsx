import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../Router';
import { ListItemEstimate } from './ListItemEstimate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEstimateRecords } from '../../../../hooks';

export interface ConfirmationDialogRawProps {
  name: string;
  open: boolean;
  onClose: (value?: string) => void;
  projId: string
}


export const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
  const { name, onClose, open, projId, ...other } = props;
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { projEstimateRecords } = useEstimateRecords(projId);


  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    navigate(`${pages.projEstimate}?${generateParams({ projEstimateId:value })}`);
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  /**
   * 選択肢の生成
   */
  const actualOptions: OptionNode[] = projEstimateRecords.map<OptionNode>((rec) => {
    const { $id } = rec;

    return {
      value: $id.value,
      key: $id.value,
      component: (<ListItemEstimate estimateRecord={rec} />),
    };
  });



  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        {'編集する見積もりを選択してください'}
      </DialogTitle>
      <DialogContent dividers>
        {Boolean(actualOptions.length) &&
          <RadioGroup
            name={name}
            aria-label={name}
            value={value}
            onChange={handleChange}
          >
            {actualOptions?.map((option) => {
              return (
                <FormControlLabel
                  key={option.key}
                  value={option.value}
                  control={<Radio />}
                  label={option.component}
                />
              );
            })}

          </RadioGroup>}
          
          
        {!(actualOptions.length) &&
          <Stack direction={'row'} spacing={1}>
            <WarningAmberIcon /> 
            <Typography variant='body2'>
              見積もりはまだ作成されていません
            </Typography>
          </Stack>}

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          キャンセル
        </Button>
        <Button onClick={handleOk}>
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};