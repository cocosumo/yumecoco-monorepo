export type KeyOfSubtable<T extends {
  type: 'SUBTABLE',
  value: Array<
  {
    id: string;
    value: unknown
  }
  >
}> = keyof T['value'][number]['value'];