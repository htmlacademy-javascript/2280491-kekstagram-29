import { createSlider, onPictureEffect, destroySlider } from './photo-effects.js';

const SCALE_SIZES = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
};
let currentScale = SCALE_SIZES.MAX;

const imgUploadInputElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCloseElement = document.querySelector('.img-upload__cancel');
const scaleControlMinusElement = document.querySelector('.scale__control--smaller');
const scaleControlPlusElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const effectsListElement = document.querySelector('.effects__list');

const onModalCloseClick = () => {
  closeModal();
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

const scaleImg = () => {
  const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
  imgUploadPreviewImgElement.style.transform = `scale(${currentScale / SCALE_SIZES.MAX})`;
  scaleControlValueElement.value = `${currentScale}%`;
};

const resetImgScale = () => {
  currentScale = SCALE_SIZES.MAX;
  scaleImg();
};

const onPictureIncrease = () => {
  if (currentScale < SCALE_SIZES.MAX) {
    currentScale += SCALE_SIZES.STEP;
    scaleImg();
  }
};

const onPictureDecrease = () => {
  if (currentScale > SCALE_SIZES.MIN) {
    currentScale -= SCALE_SIZES.STEP;
    scaleImg();
  }
};

const addModalEventListeneres = () => {
  imgUploadCloseElement.addEventListener('click', onModalCloseClick);
  document.addEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.addEventListener('click', onPictureIncrease);
  scaleControlMinusElement.addEventListener('click', onPictureDecrease);
  effectsListElement.addEventListener('click', onPictureEffect);
};

const removeModalEventListeneres = () => {
  imgUploadCloseElement.removeEventListener('click', onModalCloseClick);
  document.removeEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.removeEventListener('click', onPictureIncrease);
  scaleControlMinusElement.removeEventListener('click', onPictureDecrease);
  effectsListElement.removeEventListener('click', onPictureEffect);
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

  removeModalEventListeneres();
  destroySlider();
}

export { uploadImg };
