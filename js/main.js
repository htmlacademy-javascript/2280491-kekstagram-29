import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { uploadImg } from './load-new-photo.js';

const photosArr = createPhotos();
renderThumbnails(photosArr);
uploadImg();
