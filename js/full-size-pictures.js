const onModalActions = (photosArr) => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const closeBtn = document.querySelector('.big-picture__cancel');

  const modalOpen = (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');

      const templateComment = document.querySelector('#comment').content;
      const bigPictureImg = document.querySelector('.big-picture__img img');
      const bigPictureLikes = document.querySelector('.likes-count');
      const bigPictureCommentsNumber = document.querySelector('.comments-count');
      const bigPictureDescription = document.querySelector('.social__caption');
      const thumbnailLikes = evt.target.parentElement.querySelector('.picture__likes');
      const thumbnailCommentsNumber = evt.target.parentElement.querySelector('.picture__comments');
      const thumbnailDescription = evt.target.parentElement.querySelector('.picture__info');
      const bigPictureComments = document.querySelector('.social__comments');
      bigPictureImg.src = evt.target.src;
      bigPictureDescription.textContent = thumbnailDescription.getAttribute('alt');
      bigPictureLikes.textContent = thumbnailLikes.textContent;
      bigPictureCommentsNumber.textContent = thumbnailCommentsNumber.textContent;
      document.querySelector('.social__comment-count').classList.add('hidden');
      document.querySelector('.comments-loader').classList.add('hidden');
      document.body.classList.add('modal-open');
      const thumbnailId = evt.target.parentElement.getAttribute('data-id');

      const arrElement = photosArr.find((element) => element.id === Number(thumbnailId));

      bigPictureComments.textContent = '';

      const createComment = ({avatar, message, name}) => {
        const comment = templateComment.cloneNode(true);

        comment.querySelector('.social__comment img').setAttribute('src', avatar);
        comment.querySelector('.social__comment img').setAttribute('alt', name);
        comment.querySelector('.social__text').textContent = message;

        return comment;
      };

      const renderComments = ({comments}) => {
        const fragment = document.createDocumentFragment();
        comments.forEach((elem) => {
          const comment = createComment(elem);
          fragment.append(comment);
        });
        bigPictureComments.append(fragment);
      };

      renderComments(arrElement);
    }
  };

  const modalCloseClick = () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }
  });

  closeBtn.addEventListener('click', modalCloseClick);
  thumbnailsContainer.addEventListener('click', modalOpen);
};

export { onModalActions };
