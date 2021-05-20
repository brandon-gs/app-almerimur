export const changeNameKeyFromArray = (
  array: Array<never>,
  oldKey: string,
  newKey: string
) => {
  let newArray = array.slice(0);
  for (let i = 0; i < newArray.length; i++) {
    newArray[i][newKey] = newArray[i][oldKey];
    delete newArray[i][oldKey];
  }
  return newArray;
};

export const changeNameKey = (
  object: Record<string, any>,
  oldKey: string,
  newKey: string
) => {
  const _object = object;
  _object[newKey] = _object[oldKey];
  delete _object[oldKey];
  return _object;
};
