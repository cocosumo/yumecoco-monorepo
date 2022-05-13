type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;
