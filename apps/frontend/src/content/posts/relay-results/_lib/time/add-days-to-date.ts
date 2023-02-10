/**
 * Create a JS Date object and add specified number of days.
 *
 * @param dateParam - Either number of seconds since 00:00:00 UTC on 1 January
 * 1970 OR a date string in a format recognized by the Date.parse() method.
 *
 * @param days - Number of days to add.
 */
export function add_days_to_date(
  dateParam: number | string,
  days: number
): Date {
  const dateObject = new Date(dateParam);
  dateObject.setDate(dateObject.getDate() + days);
  return dateObject;
}
