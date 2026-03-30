/**
 * @param prefix prefix the string with a string
 * @param suffix add a string to the end
 * @returns concatenated prefix + random numbers, 6 digits + suffix.
 * Example return value: `Prefix 201237 Suffix`
 */
export function randomString(prefix = '', suffix = ''): string {
  return `${prefix}${Math.random().toString().slice(2, 8)}${suffix}`;
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
