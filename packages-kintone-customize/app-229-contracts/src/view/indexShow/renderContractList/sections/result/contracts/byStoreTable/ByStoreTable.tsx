import { ByStoreTHead } from './ByStoreTHead';
import { ByStoreTBody } from './ByStoreTBody';
import { ByStoreTableContainer } from './ByStoreTableContainer';
import { ByStoreSummary } from './ByStoreSummary';
import { ByStoreNoRecords } from './ByStoreNoRecords';

export const ByStoreTable = ({
  storeName,
  records,
}:{
  storeName: string,
  records: DB.SavedRecord[]
}) => {

  const hasRecords = records.length > 0;

  return (
    <ByStoreTableContainer
      storeName={storeName}
    >
      {hasRecords && (
      <>
        <ByStoreTHead />
        <ByStoreTBody records={records} />
        <ByStoreSummary records={records} />
      </>
      )}

      {!hasRecords && (
        <ByStoreNoRecords />
      )}

    </ByStoreTableContainer>
  );
};