export const mapError = (error: any) => {
  const map: Record<string, string> = {};

  map[error.field] = error.message;
  console.log(map);

  return map;
};
