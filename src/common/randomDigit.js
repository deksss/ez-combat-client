const randomDigit = digitLenght => {
  const n = digitLenght || 1;
  const zeros = Math.pow(10, n - 1);
  return Math.floor(1 + zeros + Math.random() * (9 + zeros));
};

export default randomDigit;
