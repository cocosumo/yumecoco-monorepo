import { DateTime } from 'luxon';
const dt = DateTime;

export const isValidTimeDuration = (start: string | null, end: string | null) => {
  if (!start || !end) return false;

  return dt.fromISO(start) < dt.fromISO(end);
};