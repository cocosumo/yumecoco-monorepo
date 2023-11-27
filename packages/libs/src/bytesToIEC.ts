import byteSize from 'byte-size';

export const bytesToIEC = (bytes: number) => {
  const result = byteSize(bytes, {
    units: 'iec',
  });

  return result.toString();
};