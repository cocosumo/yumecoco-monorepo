
import { calculateEstimateRow } from './calculateEstimateRow';


export const calculateEstimate = (
  {
    materials,
  } : {
    materials: Parameters<typeof calculateEstimateRow>[0][]
  },
) => {

  return materials.map((m) => calculateEstimateRow(m));

};