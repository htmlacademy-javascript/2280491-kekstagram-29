import { sendFormData } from './requests.js';
import { closeModal } from './load-new-photo.js';

const HASHTAGS_MAX_NUMBER = 5;
const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const submitButtonElement = formElement.querySelector('#upload-submit');
const MessageStatuses = {
  SUCCESS: 'success',
  ERROR: 'error',
};

let messageElement;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const clearFormValidation = () => {
  pristine.reset();
};

const onOutsideMessageClick = (evt) => {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    evt.target.remove();
  }
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const modalSuccessMessageElement = document.querySelector('.success');
    if (modalSuccessMessageElement) {
      onMessageClose(modalSuccessMessageElement);
    }
  }
};

const showMessage = (element, text = null) => {
  messageElement = element;
  const modalElement = document.querySelector(`#${element}`).content;
  const message = modalElement.cloneNode(true);
  const messageModalElement = message.querySelector(`.${element}`);
  const buttonElement = messageModalElement.querySelector(`.${element}__button`);
  if (text) {
    const errorTitleElement = messageModalElement.querySelector(`.${element}__title`);
    errorTitleElement.textContent = text;
  }
  document.body.append(message);
  buttonElement.addEventListener('click', onMessageClose);
  messageModalElement.addEventListener('click', onOutsideMessageClick);
  submitButtonElement.disabled = false;
};

const onSuccess = () => {
  showMessage(MessageStatuses.SUCCESS);
  closeModal();
  document.addEventListener('keydown', onModalCloseEscape);
};

const onError = (text = null) => {
  showMessage(MessageStatuses.ERROR, text);
};

function onMessageClose() {
  const messageModalElement = document.querySelector(`.${messageElement}`);
  const buttonElement = messageModalElement.querySelector(`.${messageElement}__button`);

  messageModalElement.remove();
  document.removeEventListener('keydown', onModalCloseEscape);
  buttonElement.removeEventListener('click', onMessageClose);
  messageModalElement.removeEventListener('click', onOutsideMessageClick);
}

const onSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    submitButtonElement.disabled = true;
    sendFormData(evt.target, onSuccess, onError);
  }
};

const normalizeTags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateUniqueHashtags = (value) => {
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
  validateUniqueHashtags,
  'хэш-теги повторяются'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsNumber,
  'превышено количество хэш-тегов'
);

export { onSubmit, onMessageClose, onError, clearFormValidation };
