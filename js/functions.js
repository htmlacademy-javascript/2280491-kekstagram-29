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

const meetingHours = (workStarts, workEnds, meetingStarts, meetingDuration) => {
  const timeInMinutes = (hours) => {
    const timeParts = hours.split(':');
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  };

  return timeInMinutes(meetingStarts) >= timeInMinutes(workStarts)
    && timeInMinutes(meetingStarts) + meetingDuration <= timeInMinutes(workEnds);
};

meetingHours('08:00', '17:30', '14:00', 90);
meetingHours('8:0', '10:0', '8:0', 120);
meetingHours('08:00', '14:30', '14:00', 90);
meetingHours('14:00', '17:30', '08:0', 90);
meetingHours('8:00', '17:30', '08:00', 900);
