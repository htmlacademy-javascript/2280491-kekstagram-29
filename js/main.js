const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Вася',
  'Петя',
  'Маша',
  'Саша',
  'Глаша'
];

const DESCRIPTIONS = [
  'Моё фото',
  'У меня всё супер, а у вас?',
  'Как у вас дела?',
  'А вы чем занимаетесь?',
  'Что нового?',
  'Не хватило слов для описания этого фото'
];


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let commentId = 1;

const getComments = (numberOfComments) => {
  const comments = [];
  for (let i = 0; i < numberOfComments; i++) {
    comments.push({
      id: commentId,
      avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
    commentId += 1;
  }
  return comments;
};

const createPhotos = () => {
  const photos = [];
  for (let i = 1; i < 26; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: getComments(getRandomInteger(0, 30))
    });
  }
  return photos;
};

createPhotos();
