import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initModal } from './full-size-pictures.js';

const photosArr = createPhotos();
renderThumbnails(photosArr);
initModal(photosArr);
