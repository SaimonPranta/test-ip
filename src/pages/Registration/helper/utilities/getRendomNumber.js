const randomNumberGenerator = () => {
    const min = 0;
    const max = 9;
    const numberArray = [];
    new Array(5).fill().forEach((item, index) => {
      numberArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    });
    return numberArray.toString().replaceAll(",", "");
  };

  export {randomNumberGenerator}