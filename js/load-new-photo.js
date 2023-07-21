import { createSlider, onPictureEffect, destroySlider } from './photo-effects.js';
import { onSubmit, onMessageClose } from './form-validation.js';

const SCALE_SIZES = {
  step: 25,
  max: 100,
  min: 25,
};
let currentScale = SCALE_SIZES.max;

const imgUploadInputElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCloseElement = document.querySelector('.img-upload__cancel');
const scaleControlMinusElement = document.querySelector('.scale__control--smaller');
const scaleControlPlusElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const effectsListElement = document.querySelector('.effects__list');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const formElement = document.querySelector('#upload-select-image');

const onModalCloseClick = () => {
  closeModal();
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const modalMessage = document.querySelector('.success') || document.querySelector('.error');
    if (modalMessage) {
      onMessageClose(modalMessage);
    } else {
      closeModal();
    }
  }
};

const scaleImg = () => {
  const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
  imgUploadPreviewImgElement.style.transform = `scale(${currentScale / SCALE_SIZES.max})`;
  scaleControlValueElement.value = `${currentScale}%`;
};

const resetImgScale = () => {
  currentScale = SCALE_SIZES.max;
  scaleImg();
};

const onPictureIncrease = () => {
  if (currentScale < SCALE_SIZES.max) {
    currentScale += SCALE_SIZES.step;
    scaleImg();
  }
};

const onPictureDecrease = () => {
  if (currentScale > SCALE_SIZES.min) {
    currentScale -= SCALE_SIZES.step;
    scaleImg();
  }
};

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const addModalEventListeneres = () => {
  imgUploadCloseElement.addEventListener('click', onModalCloseClick);
  document.addEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.addEventListener('click', onPictureIncrease);
  scaleControlMinusElement.addEventListener('click', onPictureDecrease);
  effectsListElement.addEventListener('click', onPictureEffect);
  formElement.addEventListener('submit', onSubmit);
  textHashtagsElement.addEventListener('keydown', onInputKeydown);
  textDescriptionElement.addEventListener('keydown', onInputKeydown);
};

const removeModalEventListeneres = () => {
  imgUploadCloseElement.removeEventListener('click', onModalCloseClick);
  document.removeEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.removeEventListener('click', onPictureIncrease);
  scaleControlMinusElement.removeEventListener('click', onPictureDecrease);
  effectsListElement.removeEventListener('click', onPictureEffect);
  formElement.removeEventListener('submit', onSubmit);
  textHashtagsElement.removeEventListener('keydown', onInputKeydown);
  textDescriptionElement.removeEventListener('keydown', onInputKeydown);
};

const onFileChange = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetImgScale();
  addModalEventListeneres();
  createSlider();
};

const uploadImg = () => {
  imgUploadInputElement.addEventListener('change', onFileChange);
};

function closeModal() {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInputElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';

  removeModalEventListeneres();
  destroySlider();
}

export { uploadImg, closeModal };
