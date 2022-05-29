export function generateId(size = 10) {
  return Math.random().toString(16).substring(2, size);
}
