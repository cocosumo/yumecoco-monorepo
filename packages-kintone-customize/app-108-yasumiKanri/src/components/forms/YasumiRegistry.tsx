import { useState, useRef } from 'react';
import { Container, Button, Grid } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import MonthCalendar from '../UI/MonthCalendar';
import {
  isMonthNow, ISOtoLux, isWithinMonth, JSDToLux,
} from '../../helpers/time';
import getYasumiCount from '../../backend/settings';

import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';
import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';
import SimpleSnackbar from '../UI/snackbars/SimpleSnackBar';
import clearYasumi from '../../handlers/clearYasumi';
import EditRecordSnackbar from '../UI/snackbars/EditRecordSnackbar';
import { getLeaveInClickedDate, getOrdinaryInClickedDate } from '../../handlers/getInfoInClickedDate';
import Instructions from '../paragraphs/Instructions';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState<any>();
  const [snack, setSnack] = useState({ isOpen: false, type: null });
  const [editRecordSnack, setEditRecordSnack] = useState({ isOpen: false, data: [], date: '' });
  const [remainingYasumi, setRemainingYasumi] = useState<number | undefined>(0);
  const [savedRecords, setSavedRecords] = useState();
  const [isSaving, setIsSaving] = useState();
  const [isEditing, seIsEditing] = useState(false);
  const currentMonth = useRef<any>();
  const maxYasumi = useRef(0);

  const clickDayHandler = (info: any) => {
    const clickedLuxDate = ISOtoLux(info.dateStr);
    if (!isSaving && isWithinMonth(currentMonth.current, clickedLuxDate)) {
      const leaveInClickedDate = getLeaveInClickedDate(yasumiRecords[info.dateStr]);
      if (isMonthNow(clickedLuxDate)) {
        const ordinaryClickedDate = getOrdinaryInClickedDate(yasumiRecords[info.dateStr]);
        if (ordinaryClickedDate) {
          setEditRecordSnack({
            isOpen: true,
            data: ordinaryClickedDate,
            date: info.dateStr,
          });
          return;
        }
      }

      if (leaveInClickedDate) {
        setEditRecordSnack({
          isOpen: true,
          data: leaveInClickedDate,
          date: info.dateStr,
        });
      }

      yasumiChangeHandler({
        info,
        yasumiRecords,
        savedRecords,
        currentMonth,
        maxYasumi,
        remainingYasumi,
        setRemainingYasumi,
        setYasumiRecords,
        setSavedRecords,
        setSnack,
        setIsSaving,
        seIsEditing,
      });
    }
  };

  const datesSetHandler = async ({ view }: any) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);
    maxYasumi.current = await getYasumiCount(currentMonth.current);
    refetchData({
      currentMonth,
      maxYasumi,
      setSavedRecords,
      setYasumiRecords,
      setRemainingYasumi,
    });
  };

  const clearHandler = () => {
    clearYasumi({
      yasumiRecords,
      currentMonth,
      maxYasumi,
      setSavedRecords,
      setYasumiRecords,
      setRemainingYasumi,
      setSnack,
      setIsSaving,
    });
  };

  deleteExcessYasumi({
    remainingYasumi,
    yasumiRecords,
    currentMonth,
    maxYasumi,
    setSavedRecords,
    setYasumiRecords,
    setRemainingYasumi,
    setSnack,
  });

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        alignItems="center"
        marginBottom={2}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HelpIcon />}
          onClick={() => {
            const element = document.getElementById('helpSection');
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          使い方
        </Button>
      </Grid>
      <MonthCalendar
        clearHandler={clearHandler}
        clickDayHandler={clickDayHandler}
        currentMonth={currentMonth.current}
        datesSetHandler={datesSetHandler}
        isEditing={isEditing}
        remainingYasumi={remainingYasumi || 0}
        yasumiRecords={yasumiRecords}
      />

      <SimpleSnackbar 
        open={snack.isOpen} 
        setSnackOpen={setSnack as any} 
        snackType={snack.type as any}
      />
      <EditRecordSnackbar {...{ editRecordSnack, setEditRecordSnack }} />
      <Instructions />
    </Container>
  );
};

export default YasumiRegistry;
