const HASHTAGS_MAX_NUMBER = 5;
const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const onSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
  }
};

const normalizeTags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateuniqueHashtags = (value) => {
  const hashtags = normalizeTags(value);
  const uniqueHashtags = new Set(hashtags.map((hashtag) => hashtag.toLowerCase()));
  return hashtags.length === uniqueHashtags.size;
};

const validateRegexpHashtags = (value) => {
  const hashtags = normalizeTags(value);
  const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.find((hashtag) => !hashtagRegexp.test(hashtag)) === undefined;
};

const validateHashtagsNumber = (value) => {
  const hashtags = normalizeTags(value);
  return hashtags.length <= HASHTAGS_MAX_NUMBER;
};

pristine.addValidator(
  hashtagsInputElement,
  validateRegexpHashtags,
  'введён невалидный хэш-тег'
);

pristine.addValidator(
  hashtagsInputElement,
  validateuniqueHashtags,
  'хэш-теги повторяются'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsNumber,
  'превышено количество хэш-тегов'
);

export { onSubmit };
