import { IProjects } from 'types';
import { saveRecord } from '../common/saveRecord';
import { APPIDS } from '../config';
import { updateRelatedProjects } from './updateRelatedProjects';




/**
 * レコードを保存する。
 *
 * @param record
 * @param projId Optional. If provided, it will update the record instead.
 * @param revision Optional. If record lock is needed, use the record's revision number to define this.
 *
 * @see レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B4%E6%96%B0-PUT-
 *
 * @returns Object containing id and revision.
 */
export const saveCustGroup = async (
  {
    record,
    projId,
    revision,
  }:
  {
    record: Partial<IProjects>,
    projId?: string,
    revision?:string,
  },
) => {

  /** Populate aggregate fields. */
  const aggRecord = { ...record }; // avoid argument mutation.
  aggRecord.cocoConstNames = {
    value: record.agents?.value
      .map(({ value: { agentName } }) => agentName.value)
      .join(', ') || '',
  };

  return saveRecord({
    appId: APPIDS.project,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: projId ? () => updateRelatedProjects(projId) : undefined,
  });

};