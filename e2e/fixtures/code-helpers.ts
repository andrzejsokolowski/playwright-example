/**
 * @param prefix prefix the string with a string
 * @param suffix add a string to the end
 * @returns concatenated prefix + random numbers, 6 digits + suffix.
 * Example return value: `Prefix 201237 Suffix`
 */
export function randomString(prefix = '', suffix = ''): string {
  return `${prefix}${Math.random().toString().slice(2, 8)}${suffix}`;
}

/**
 * Returns today's day as number
 */
export function getFirstDayToSelect(): number {
  const now = new Date();
  const today = now.getDate();
  return today;
}

//for non-numerical inputs
export function randomText(textLength = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let randomText = '';
  for (let i = 0; i < textLength; i++) {
    randomText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomText;
}

/**
 * for prices, etc - Generates a number from 1 - 10 and returns it as a string.
 **/
export function randomNumber(): string {
  return String(Math.floor(Math.random() * 10) + 1);
}

//Generates a number from 1 - 10 and returns it as a number.
export function randomInt(): number {
  return Math.floor(Math.random() * 10) + 1;
}

//generates a valid password.
export function randomPassword(): string {
  const pass = `${randomNumber()}AT${randomText()}!!!`;
  return pass;
}
