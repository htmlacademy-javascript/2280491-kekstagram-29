import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { onPictureActions } from './full-size-pictures.js';

renderThumbnails(createPhotos());
onPictureActions();
