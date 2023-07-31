import { createSlider, onPictureEffect, destroySlider } from './photo-effects.js';
import { onSubmit, onMessageClose, clearFormValidation } from './form-validation.js';

const ScaleSizes = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
};
const fileTypes = ['jpg', 'jpeg', 'png'];
let currentScale = ScaleSizes.MAX;

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
const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');

const onModalCloseClick = () => {
  closeModal();
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const modalMessageElement = document.querySelector('.success') || document.querySelector('.error');
    if (modalMessageElement) {
      onMessageClose(modalMessageElement);
    } else {
      closeModal();
    }
  }
};

const scaleImg = () => {
  imgUploadPreviewImgElement.style.transform = `scale(${currentScale / ScaleSizes.MAX})`;
  scaleControlValueElement.value = `${currentScale}%`;
};

const resetImgScale = () => {
  currentScale = ScaleSizes.MAX;
  scaleImg();
};

const onPictureIncrease = () => {
  if (currentScale < ScaleSizes.MAX) {
    currentScale += ScaleSizes.STEP;
    scaleImg();
  }
};

const onPictureDecrease = () => {
  if (currentScale > ScaleSizes.MIN) {
    currentScale -= ScaleSizes.STEP;
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
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));
  if (matches) {
    const uploadedFile = URL.createObjectURL(file);
    imgUploadPreviewImgElement.src = uploadedFile;
    document.querySelectorAll('.effects__preview').forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

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
  scaleControlValueElement.value = '100%';

  clearFormValidation();
  removeModalEventListeneres();
  destroySlider();
}

export { uploadImg, closeModal };
