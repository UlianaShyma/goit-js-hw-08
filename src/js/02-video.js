import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const onPlayer = ({ seconds }) => {
  localStorage.setItem(STORAGE_KEY, seconds);
};

if (localStorage.getItem(STORAGE_KEY)) {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}

player.on('timeupdate', throttle(onPlayer, 1000));
