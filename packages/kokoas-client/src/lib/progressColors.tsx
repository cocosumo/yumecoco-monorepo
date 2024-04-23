import { blue, blueGrey, green, lightGreen, orange, yellow } from '@mui/material/colors';
import { KProgress } from 'types/src/common/order';

export const statusBGcolorMap: Record<KProgress, string> = {
  未発注: blueGrey[50],
  発注済: blue[600],
  請求済: orange[600],
  請求承認済: yellow[600],
  請求確認済: lightGreen[600],
  支払済: green[600],
};

export const statusFGcolorMap: Record<KProgress, string> = {
  未発注: blueGrey[600],
  発注済: blue[50],
  請求済: orange[50],
  請求承認済: yellow[50],
  請求確認済: lightGreen[50],
  支払済: green[50],
};
