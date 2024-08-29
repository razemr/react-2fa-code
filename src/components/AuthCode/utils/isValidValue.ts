const isValidValue = (
  value: string,
  pattern: RegExp | string,
  length: number
): boolean => {
  if (!pattern) return true;

  const regex =
    pattern instanceof RegExp
      ? pattern
      : new RegExp(`${pattern}{0,${length}}$`);
  return regex.test(value);
};

export default isValidValue;
