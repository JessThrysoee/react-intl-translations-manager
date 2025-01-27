function compareByKey(a, b) {
  const ka = a.key;
  const kb = b.key;

  if (ka < kb) {
    return -1;
  }
  if (ka > kb) {
    return 1;
  }
  return 0;
}

export { compareByKey };
