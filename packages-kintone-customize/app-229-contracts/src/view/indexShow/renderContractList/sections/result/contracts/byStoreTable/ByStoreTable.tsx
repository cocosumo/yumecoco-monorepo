import { ByStoreTHead } from './ByStoreTHead';
import { ByStoreTBody } from './ByStoreTBody';
import { ByStoreTableContainer } from './ByStoreTableContainer';
import { ByStoreSummary } from './ByStoreSummary';

export const ByStoreTable = ({
  storeName,
  records,
}:{
  storeName: string,
  records: DB.SavedRecord[]
}) => {

  return (
    <ByStoreTableContainer
      storeName={storeName}
    >
      <ByStoreTHead />
      <ByStoreTBody records={records} />
      <ByStoreSummary records={records} />
    </ByStoreTableContainer>
  );
};