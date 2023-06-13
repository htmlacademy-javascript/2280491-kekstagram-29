function stringLengthCheck (str, maxlength) {
  return str <= maxlength;
}

stringLengthCheck(25, 24);

function isPalindrome (str) {
  const firstStr = str.replaceAll(' ', '').toLowerCase();
  let secondStr = '';

  for (let i = firstStr.length - 1; i >= 0; i--) {
    secondStr += firstStr.at(i);
  }

  return firstStr === secondStr;
}

isPalindrome('тОпот топоТ');

function extractNumber (data) {
  let result = '';
  let str = data;

  if (typeof(data) === 'number') {
    str = data.toString();
  }

  for (let i = 0; i <= str.length - 1; i++) {

    if (!isNaN(str.at(i))) {
      result += str.at(i);
    }
  }
  return parseInt(result, 10);
}

extractNumber(5533);
