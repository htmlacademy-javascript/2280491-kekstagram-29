const picturesContainer = document.querySelector('.pictures');
const templateThumbnail = document.querySelector('#picture').content;
const templatePicture = templateThumbnail.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = templatePicture.cloneNode(true);

  thumbnail.querySelector('.picture__img').setAttribute('src', url);
  thumbnail.querySelector('.picture__info').setAttribute('alt', description);
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
