export type DateDisplayFormat = 'DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY';

export function toDateString(year: number, month: number, date: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(date).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function formatDate(dateStr: string, format: DateDisplayFormat = 'DD.MM.YYYY'): string {
  const [y, m, d] = dateStr.split('-');
  switch (format) {
    case 'DD.MM.YYYY':
      return `${d}.${m}.${y}`;
    case 'DD/MM/YYYY':
      return `${d}/${m}/${y}`;
    case 'YYYY-MM-DD':
    default:
      return dateStr;
  }
}

export function isDateBefore(dateStr: string, compareStr: string): boolean {
  return dateStr < compareStr;
}

export function isDateAfter(dateStr: string, compareStr: string): boolean {
  return dateStr > compareStr;
}
