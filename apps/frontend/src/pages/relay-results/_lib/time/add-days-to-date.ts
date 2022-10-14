/**
 * Create a JS Date object and add specified number of days.
 */
export function add_days_to_date(
  dateParam: number | string,
  days: number
): Date {
  const dateObject = new Date(dateParam);
  dateObject.setDate(dateObject.getDate() + days);
  return dateObject;
}
