import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { AndpadChip } from './AndpadChip';

export const SystemId = ({
  projId,
  systemId,
  forceLinkedAndpadSystemId,
}:{
  projId: string,
  systemId?: string | number;
  forceLinkedAndpadSystemId?: string;
}) => {
  const { mutate: saveProject } = useSaveProject();

  const handleRemoveForceLinkedAndpadSystemId = () => {
    saveProject({
      projId,
      record: {
        forceLinkedAndpadSystemId: { value: '' },
      },
    });
  };


  return (
    <>
      {systemId && (
      <AndpadChip 
        systemId={systemId}
        tooltipTitle='ここあすからANDPADへの情報更新が出来ます'
      />)}
      {forceLinkedAndpadSystemId && (
      <AndpadChip 
        tooltipTitle='強制接続のため、ここあすからANDPADへの情報更新が出来ません'
        systemId={forceLinkedAndpadSystemId}
        onDelete={handleRemoveForceLinkedAndpadSystemId}
        color='warning'
      />
      
      )}
    </>
  );
};