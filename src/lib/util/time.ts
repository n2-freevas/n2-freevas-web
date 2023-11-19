export function convertDateToFormatString(date: Date){
  return date
  .toLocaleString('ja', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replaceAll('/', '.');
}
