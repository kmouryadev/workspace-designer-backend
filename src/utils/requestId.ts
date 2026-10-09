export function generateRequestId(): string {
  const number = Math.floor(10000 + Math.random() * 89999);
  return `MR-${number}`;
}
