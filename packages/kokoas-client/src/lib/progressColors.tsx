import { blue, blueGrey, green, grey, orange, teal, yellow } from '@mui/material/colors';
import { KProgress } from 'types/src/common/order';


/**
 * 依頼に応じて、修正。hexやrgbも可。
 */
export const statusBGcolorMap: Record<KProgress, string> = {
  未発注: grey[600],
  発注済: blue[800],
  請求済: teal[800],
  請求確認済: orange[800],
  請求承認済: yellow[800],
  支払済: green[800],
};

export const statusFGcolorMap: Record<KProgress, string> = {
  未発注: blueGrey[600],
  発注済: blue[50],
  請求済: orange[50],
  請求確認済: orange[50],
  請求承認済: yellow[50],
  支払済: green[50],
};
