const SHOW_COMMENTS = 5;
let shownComments = 0;
let currentThumbnail;

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const templateComment = document.querySelector('#comment').content;
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureCommentsNumber = document.querySelector('.comments-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureComments = document.querySelector('.social__comments');
const allCommentsNumber = document.querySelector('.social__comment-count');
const commentLoaderBtn = document.querySelector('.comments-loader');

const createComment = ({avatar, message, name}) => {
  const comment = templateComment.cloneNode(true);

  comment.querySelector('.social__comment img').setAttribute('src', avatar);
  comment.querySelector('.social__comment img').setAttribute('alt', name);
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const onRenderCommentsClick = ({comments}) => {
  const fragment = document.createDocumentFragment();
  const lastIndex = shownComments + SHOW_COMMENTS;
  const slicedArr = comments.slice(shownComments, lastIndex);
  shownComments = comments.slice(0, lastIndex).length;
  slicedArr.forEach((elem) => {
    const comment = createComment(elem);
    fragment.append(comment);
  });
  bigPictureComments.append(fragment);
  allCommentsNumber.textContent = `${shownComments} из ${comments.length} комментариев`;

  if (shownComments === comments.length) {
    commentLoaderBtn.classList.add('hidden');
  }
};

const onModalCloseClick = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const getThumbnail = (photosArr) => {
  const thumbnailId = currentThumbnail.getAttribute('data-id');
  return photosArr.find((element) => element.id === Number(thumbnailId));
};

const initComments = (photosArr) => {
  const thumbnailCommentsNumber = currentThumbnail.querySelector('.picture__comments');
  bigPictureCommentsNumber.textContent = thumbnailCommentsNumber.textContent;
  bigPictureComments.textContent = '';

  commentLoaderBtn.classList.remove('hidden');
  shownComments = 0;

  onRenderCommentsClick(getThumbnail(photosArr));
};

const processThumbnail = () => {
  const thumbnailLikes = currentThumbnail.querySelector('.picture__likes');
  const thumbnailDescription = currentThumbnail.querySelector('.picture__info');
  bigPictureImg.src = currentThumbnail.querySelector('.picture__img').src;
  bigPictureDescription.textContent = thumbnailDescription.getAttribute('alt');
  bigPictureLikes.textContent = thumbnailLikes.textContent;
};

const onModalOpenClick = (evt, photosArr) => {
  if (evt.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    currentThumbnail = evt.target.parentElement;

    processThumbnail();
    initComments(photosArr);
  }
};

const initModal = (photosArr) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onModalCloseClick();
    }
  });
  commentLoaderBtn.addEventListener('click', () => onRenderCommentsClick(getThumbnail(photosArr)));
  closeBtn.addEventListener('click', onModalCloseClick);
  thumbnailsContainer.addEventListener('click', (evt) => onModalOpenClick(evt, photosArr));
};

export { initModal };
