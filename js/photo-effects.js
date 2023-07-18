const EFFECTS = [
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
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
let effect;

const onSliderValueUpdate = () => {
  if (effect) {
    const sliderValue = sliderElement.noUiSlider.get();
    imgUploadPreviewImgElement.style.filter = `${effect.filter}(${sliderValue}${effect.measure})`;
    effectLevelValueElement.value = parseFloat(sliderValue);
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[0].minValue,
      max: EFFECTS[0].maxValue,
    },
    start: EFFECTS[0].maxValue,
    step: EFFECTS[0].step
  });

  imgUploadEffectLevel.classList.add('hidden');
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
      imgUploadEffectLevel.classList.add('hidden');
      imgUploadPreviewImgElement.style.filter = 'none';
      effectLevelValueElement.value = '';
      effect = null;
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      effect = EFFECTS.find((element) => element.name === effectValue);
      updateSlider();
    }
  }
};

const destroySlider = () => {
  const originalEffect = document.querySelector('#effect-none');
  originalEffect.checked = true;
  sliderElement.noUiSlider.destroy();
  effect = null;
};

export { createSlider, onPictureEffect, destroySlider };
