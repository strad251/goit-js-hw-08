import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iFrame = document.querySelector('#vimeo-player');
const player = new Player(iFrame);

    

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle((onPlay), 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

console.log(localStorage);


