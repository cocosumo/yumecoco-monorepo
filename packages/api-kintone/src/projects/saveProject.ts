import { saveRecord } from '../common';

import { appId, RecordType } from './config';
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
export const saveProject = async (
  {
    record,
    projId,
    revision,
    shouldUpdateRelated = true,
  }:
  {
    record: Partial<RecordType>,
    projId?: string,
    revision?:string,
    shouldUpdateRelated?: boolean
  },
) => {

  /** Populate aggregate fields. */
  const aggRecord = { ...record }; // avoid argument mutation.
  aggRecord.cocoConstNames = {
    value: record.agents?.value
      .map(({ value: { agentName } }) => agentName.value)
      .join(', ') || '',
  };

  /* 
    copy of subtables, custGroupAgents and custGroup is deprecated.
    Use and add aggregate fields. e.g.custNames, yumeAgNames, cocoAgNames  
    Reason: Too many API calls, and maintenance overhead is not worth it.
    TODO: Remove from db, and update affected code.
  */

  return saveRecord({
    app: appId,
    recordId: projId,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: projId && shouldUpdateRelated ? () => updateRelatedProjects(projId, record) : undefined,
  });

};