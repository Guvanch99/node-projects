export function stringToBoolean(value?: string): boolean {
  if (!value) {
    return false;
  }
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  return false;
}
