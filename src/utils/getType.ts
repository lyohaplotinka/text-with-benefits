export default function getType(variable: unknown): string {
  return Object.prototype.toString
    .call(variable)
    .toLowerCase()
    .replace(/\[object (.*)]/, '$1');
}
