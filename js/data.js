import {getRandomInteger, getRandomArrayElement} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Вася',
  'Петя',
  'Маша',
  'Саша',
  'Глаша'
];

const DESCRIPTIONS = [
  'Моё лучшее фото!',
  'Моё фото!',
  'У меня всё супер, а у вас?',
  'Как у вас дела?',
  'А вы чем занимаетесь?',
  'Что нового?',
  'Не хватило слов для описания этого кадра...',
  'А это что-то интересненькое :)',
  'Приветики :)',
];

const PHOTOS_NUMBER = {
  max: 25,
  min: 1,
};

const LIKES_NUMBER = {
  min: 15,
  max: 200,
};

const COMMENTS_NUMBER = {
  min: 0,
  max: 30,
};

const AVATAR_NUMBER = {
  min: 1,
  max: 6,
};

let commentId = 1;

const getComments = (numberOfComments) => {
  const comments = [];
  for (let i = 0; i < numberOfComments; i++) {
    comments.push({
      id: commentId,
      avatar: `img/avatar-${getRandomInteger(AVATAR_NUMBER.min, AVATAR_NUMBER.max)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
    commentId += 1;
  }
  return comments;
};

const createPhotos = () => {
  const photos = [];
  for (let i = PHOTOS_NUMBER.min; i <= PHOTOS_NUMBER.max; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(LIKES_NUMBER.min, LIKES_NUMBER.max),
      comments: getComments(getRandomInteger(COMMENTS_NUMBER.min, COMMENTS_NUMBER.max))
    });
  }
  return photos;
};

export {createPhotos};
