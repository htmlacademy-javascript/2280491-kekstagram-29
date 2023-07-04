const onPictureActions = () => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const closeBtn = document.querySelector('.big-picture__cancel');

  const bigPictureOpen = (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');

      const bigPictureImg = document.querySelector('.big-picture__img img');
      const bigPicturelikes = document.querySelector('.likes-count');
      const bigPictureComments = document.querySelector('.comments-count');
      const thumbnailLikes = evt.target.parentElement.querySelector('.picture__likes');
      const thumbnailComments = evt.target.parentElement.querySelector('.picture__comments');
      bigPictureImg.src = evt.target.src;
      bigPicturelikes.textContent = thumbnailLikes.textContent;
      bigPictureComments.textContent = thumbnailComments.textContent;
    }
  };

  const bigPictureClose = () => {
    bigPicture.classList.add('hidden');
  };

  closeBtn.addEventListener('click', bigPictureClose);
  thumbnailsContainer.addEventListener('click', bigPictureOpen);
};

export { onPictureActions };
