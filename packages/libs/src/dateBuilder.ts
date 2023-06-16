

/**
 * Partially build a date string from a year, month, and day.
 */
export const dateBuilder = ({
  year,
  month,
  day,
}:{
  year?: number,
  month?: number,
  day?: number,
}) => [[year, '年'], [month, '月'], [day, '日']]
  .filter(([value]) => value )
  .map(([value, suffix]) => `${value}${suffix}`)
  .join('');
