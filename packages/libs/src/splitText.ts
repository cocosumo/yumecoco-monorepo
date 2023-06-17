export function splitText(text: string, maxLength: number): string[] {
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return text.match(regex) || [];
}