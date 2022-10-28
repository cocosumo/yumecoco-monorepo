
/**
 * 安全なタイプでにクエリを生成するため。
 *
 * @returns Query string
 */
export const fieldMatches = <T>(
  field: T,
  value: string,
  operator : 'like' | '=' = 'like',
) => `${field} ${operator} "${value}"`;