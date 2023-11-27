import { describe, expect } from '@jest/globals';
import { bytesToIEC } from './bytesToIEC';

describe('bytesToIEC', () => {
  it('should convert bytes to human readable IEC standard', () => {
    const bytes = 1024;

    const result = bytesToIEC(bytes);

    expect(result).toBe('1.0 KiB');
  });

  it('should convert 5 * 1024 * 1024 bytes to 5.0Mib', () => {
    const bytes = 5 * 1024 * 1024;

    const result = bytesToIEC(bytes);

    expect(result).toBe('5.0 MiB');
  });
  
});