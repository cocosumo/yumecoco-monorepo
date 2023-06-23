import { Tooltip } from '@mui/material';
import format from 'date-fns/format';
import intlFormatDistance from 'date-fns/intlFormatDistance';
import { ReactNode, useEffect, useState } from 'react';

const DynamicTimeContainer = ({
  children,
  time,
}:{
  children: ReactNode;
  time: Date;
}) => (
  <Tooltip title={format(time, 'yyyy/MM/dd HH:mm:ss')}>
    <span>
      {children}
    </span>
  </Tooltip>
); 
export const DynamicTime = ({
  time,
}:{
  time: Date;
}) => {
  const [distance, setDistance] = useState(intlFormatDistance(time, new Date()));
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(intlFormatDistance(time, new Date()));
    }, 1000); // 10秒ごとに更新
    return () => clearInterval(interval);
  }, [time]);

  return (
    <DynamicTimeContainer time={time}>
      {distance}
    </DynamicTimeContainer>
  );
};