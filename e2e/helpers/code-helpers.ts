export function randomString(prefix = '', suffix = '') {
  return `${prefix} ${Math.random().toString().slice(2, 8)} ${suffix}`;
}
console.log(randomString('test'));
