import { ByStoreTHead } from './ByStoreTHead';
import { ByStoreTBody } from './ByStoreTBody';
import { ByStoreTableContainer } from './ByStoreTableContainer';
import { ByStoreSummary } from './ByStoreSummary';
import { ByStoreNoRecords } from './ByStoreNoRecords';
import { companyPropertyField } from '../../../../hooks/useContractResultGroupedByStore';

export const ByStoreTable = ({
  storeName,
  records,
}:{
  storeName: string,
  records: DB.SavedRecord[]
}) => {

  const hasRecords = records.length > 0;
  const isCompanyProperty = storeName === companyPropertyField;

  return (
    <ByStoreTableContainer
      storeName={storeName}
    >
      {hasRecords && (
      <>
        <ByStoreTHead isCompanyProperty={isCompanyProperty} />
        <ByStoreTBody records={records} isCompanyProperty={isCompanyProperty} />
        <ByStoreSummary records={records} />
      </>
      )}

      {!hasRecords && (
        <ByStoreNoRecords />
      )}

    </ByStoreTableContainer>
  );
};