const EFFECTS = [
  {
    name: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    start: 0,
    filter: 'grayscale',
    measure: '',
  },
  {
    name: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    start: 0,
    filter: 'sepia',
    measure: '',
  },
  {
    name: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: 1,
    start: 0,
    filter: 'invert',
    measure: '%',
  },
  {
    name: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    start: 0,
    filter: 'blur',
    measure: 'px',
  },
  {
    name: 'heat',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    start: 1,
    filter: 'brightness',
    measure: '',
  }
];

const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
let effect;

const onSliderValueUpdate = () => {
  if (effect) {
    const sliderValue = sliderElement.noUiSlider.get();
    imgUploadPreviewImgElement.style.filter = `${effect.filter}(${sliderValue}${effect.measure})`;
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[0].minValue,
      max: EFFECTS[0].maxValue,
    },
    start: EFFECTS[0].start,
    step: EFFECTS[0].step
  });

  sliderElement.noUiSlider.on('update', onSliderValueUpdate);
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue,
    },
    start: effect.start,
    step: effect.step
  });
};

const onPictureEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectValue = evt.target.value;
    effect = EFFECTS.find((element) => element.name === effectValue);
    updateSlider();
  }
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
};

export { createSlider, onPictureEffect, destroySlider };
