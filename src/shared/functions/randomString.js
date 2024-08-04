const generateRandomString = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minLength = 5;
  const maxLength = 8;

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export { generateRandomString };
