interface KintoneUpdateRecordsResult {
  records: {
    id: string,
    revision: string
  }[]
}

export const resultToStrArray = (result : KintoneUpdateRecordsResult) => {
  return result.records.reduce<{ ids: string[], revisions: string[] }>((prev, curr) => {
    const { id, revision } = curr;

    return { ...prev, ids: prev.ids.concat(id), revisions: prev.revisions.concat(revision) };

  }, { ids: [], revisions: [] }) ;
};