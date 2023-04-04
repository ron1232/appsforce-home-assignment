export const deepClone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};
