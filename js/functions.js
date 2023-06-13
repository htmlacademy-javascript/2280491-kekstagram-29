const stringLengthCheck = (str, maxlength) => str <= maxlength;

stringLengthCheck(25, 24);

const isPalindrome = (str) => {
  const firstStr = str.replaceAll(' ', '').toLowerCase();
  let secondStr = '';

  for (let i = firstStr.length - 1; i >= 0; i--) {
    secondStr += firstStr[i];
  }

  return firstStr === secondStr;
};

isPalindrome('тОпот топоТ');

const extractNumber = (data) => {
  let result = '';

  if (typeof data === 'number') {
    return data;
  }

  for (const value of data) {
    if (!isNaN(value)) {
      result += value;
    }
  }

  return parseInt(result, 10);
};

extractNumber('dhdh45');
