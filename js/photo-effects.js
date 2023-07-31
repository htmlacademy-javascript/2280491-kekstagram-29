const effects = [
  {
    name: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'grayscale',
    measure: '',
  },
  {
    name: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'sepia',
    measure: '',
  },
  {
    name: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: 'invert',
    measure: '%',
  },
  {
    name: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    filter: 'blur',
    measure: 'px',
  },
  {
    name: 'heat',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    filter: 'brightness',
    measure: '',
  }
];

const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
let effect;

const onSliderValueUpdate = () => {
  if (effect) {
    const sliderValue = sliderElement.noUiSlider.get();
    imgUploadPreviewImgElement.style.filter = `${effect.filter}(${sliderValue}${effect.measure})`;
    effectLevelValueElement.value = parseFloat(sliderValue).toFixed(2);
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: effects[0].minValue,
      max: effects[0].maxValue,
    },
    start: effects[0].maxValue,
    step: effects[0].step
  });

  imgUploadEffectLevelElement.classList.add('hidden');
  sliderElement.noUiSlider.on('update', onSliderValueUpdate);
  imgUploadPreviewImgElement.style.filter = 'none';
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue,
    },
    start: effect.maxValue,
    step: effect.step
  });
};

const onPictureEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectValue = evt.target.value;
    if (evt.target.value === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
      imgUploadPreviewImgElement.style.filter = 'none';
      effectLevelValueElement.value = '';
      effect = null;
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
      effect = effects.find((element) => element.name === effectValue);
      updateSlider();
    }
  }
};

const destroySlider = () => {
  const originalEffectElement = document.querySelector('#effect-none');
  originalEffectElement.checked = true;
  sliderElement.noUiSlider.destroy();
  effect = null;
};

export { createSlider, onPictureEffect, destroySlider };
