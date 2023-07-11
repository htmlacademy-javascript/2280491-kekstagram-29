const SHOW_COMMENTS = 5;
let shownComments = 0;
let currentThumbnail;

const thumbnailsContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const templateCommentElement = document.querySelector('#comment').content;
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const bigPictureLikesElement = document.querySelector('.likes-count');
const bigPictureCommentsNumberElement = document.querySelector('.comments-count');
const bigPictureDescriptionElement = document.querySelector('.social__caption');
const bigPictureCommentsElement = document.querySelector('.social__comments');
const allCommentsNumberElement = document.querySelector('.social__comment-count');
const commentLoaderBtnElement = document.querySelector('.comments-loader');

const createComment = ({avatar, message, name}) => {
  const comment = templateCommentElement.cloneNode(true);

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
  bigPictureCommentsElement.append(fragment);
  allCommentsNumberElement.textContent = `${shownComments} из ${comments.length} комментариев`;

  if (shownComments === comments.length) {
    commentLoaderBtnElement.classList.add('hidden');
  }
};

const onModalCloseClick = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
};

const getThumbnail = (photosArr) => {
  const thumbnailId = currentThumbnail.getAttribute('data-id');
  return photosArr.find((element) => element.id === Number(thumbnailId));
};

const initComments = (photosArr) => {
  const thumbnailCommentsNumber = currentThumbnail.querySelector('.picture__comments');
  bigPictureCommentsNumberElement.textContent = thumbnailCommentsNumber.textContent;
  bigPictureCommentsElement.textContent = '';

  commentLoaderBtnElement.classList.remove('hidden');
  shownComments = 0;

  onRenderCommentsClick(getThumbnail(photosArr));
};

const processThumbnail = () => {
  const thumbnailLikes = currentThumbnail.querySelector('.picture__likes');
  const thumbnailDescription = currentThumbnail.querySelector('.picture__info');
  bigPictureImgElement.src = currentThumbnail.querySelector('.picture__img').src;
  bigPictureDescriptionElement.textContent = thumbnailDescription.getAttribute('alt');
  bigPictureLikesElement.textContent = thumbnailLikes.textContent;
};

const onModalOpenClick = (evt, photosArr) => {
  if (evt.target.classList.contains('picture__img')) {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    currentThumbnail = evt.target.closest('.picture');

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
  commentLoaderBtnElement.addEventListener('click', () => onRenderCommentsClick(getThumbnail(photosArr)));
  closeBtnElement.addEventListener('click', onModalCloseClick);
  thumbnailsContainerElement.addEventListener('click', (evt) => onModalOpenClick(evt, photosArr));
};

export { initModal };
