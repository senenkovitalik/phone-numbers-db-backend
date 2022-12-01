function underscore(str: string, all_upper_case: boolean): string {
  if (all_upper_case && str === str.toUpperCase()) return str;

  const uppercase = new RegExp("([A-Z])", "g");
  const underbar_prefix = new RegExp("^_");

  const str_path = str.split("::");
  let i = 0;
  const j = str_path.length;

  for (; i < j; i++) {
    str_path[i] = (str_path[i] || "").replace(uppercase, "_$1");
    str_path[i] = (str_path[i] || "").replace(underbar_prefix, "");
  }

  return str_path.join("/").toLowerCase();
}

function underscoreObjectFields(
  object: { [s: string]: unknown }
): { [s: string]: unknown } {
  const newObj: { [key: string]: unknown } = {};

  const a: Array<[string, unknown]> = Object.entries(object).map(
    ([key, val]) => {
      return [underscore(key, false), val];
    }
  );

  a.forEach((item) => {
    const [key, value] = item;
    newObj[key] = value;
  });

  return newObj;
}

export { underscoreObjectFields };
