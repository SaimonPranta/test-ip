const convertToPlainText = (text) => {
  if (!text) {
    return "";
  }
  const newText = text.replaceAll("_", " ");

  return newText;
};

export { convertToPlainText };
