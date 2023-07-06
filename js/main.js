import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { onModalActions } from './full-size-pictures.js';

const photosArr = createPhotos();
renderThumbnails(photosArr);
onModalActions(photosArr);
