import { getData } from './requests.js';
import { onThumbnailsLoaded, onThumbnailsLoadedError } from './thumbnails.js';
import { uploadImg } from './load-new-photo.js';

getData(onThumbnailsLoaded, onThumbnailsLoadedError);
uploadImg();
