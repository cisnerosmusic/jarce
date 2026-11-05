'use strict';
const button = document.getElementById('b5');
const response = document.getElementById('response');
button?.addEventListener('click', () => {
  const illuminated = button.classList.toggle('active');
  button.setAttribute('aria-pressed', String(illuminated));
  response.textContent = illuminated
    ? 'B5 IS STILL ILLUMINATED.'
    : 'THE SIGNAL REMAINS ACTIVE.';
});

const players = [...document.querySelectorAll('.signal-player')];
const formatTime = value => Number.isFinite(value) && value >= 0
  ? Math.floor(value / 60) + ':' + String(Math.floor(value % 60)).padStart(2, '0') : '--:--';

players.forEach(player => {
  const audio = player.querySelector('audio');
  const title = player.dataset.title;
  const panel = document.createElement('div');
  panel.className = 'transport';
  panel.innerHTML = '<button type="button" class="deck-play"><span aria-hidden="true">▶</span></button><div><div class="deck-readout"><span class="deck-state">STANDBY</span><span class="deck-clock">0:00 / --:--</span></div><input class="deck-seek" type="range" min="0" max="100" value="0" step="0.1" disabled></div>';
  const toggle = panel.querySelector('button');
  const playIcon = toggle.querySelector('span');
  toggle.insertAdjacentHTML('beforeend', '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><rect x="3" y="1" width="4" height="14"/><rect x="9" y="1" width="4" height="14"/></svg>');
  const pauseIcon = toggle.querySelector('svg');
  pauseIcon.style.display = 'none';
  const seek = panel.querySelector('input');
  const clock = panel.querySelector('.deck-clock');
  const state = panel.querySelector('.deck-state');
  const message = document.createElement('p');
  message.className = 'deck-message';
  message.setAttribute('role', 'status');
  toggle.setAttribute('aria-label', 'Play ' + title);
  seek.setAttribute('aria-label', 'Playback position: ' + title);
  player.append(panel, message);
  player.classList.add('enhanced');
  const sync = () => {
    const duration = audio.duration;
    seek.disabled = !Number.isFinite(duration) || duration <= 0;
    seek.max = seek.disabled ? 100 : duration;
    seek.value = audio.currentTime || 0;
    seek.setAttribute('aria-valuetext', formatTime(audio.currentTime) + ' of ' + formatTime(duration));
    clock.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(duration);
  };
  const updateState = () => {
    const playing = !audio.paused && !audio.ended;
    playIcon.hidden = playing;
    pauseIcon.style.display = playing ? 'inline-block' : 'none';
    toggle.setAttribute('aria-label', (playing ? 'Pause ' : 'Play ') + title);
    player.classList.toggle('is-playing', playing);
    state.textContent = audio.ended ? 'END OF SIGNAL' : playing ? 'RECEIVING' : 'STANDBY';
  };
  toggle.addEventListener('click', async () => {
    if (!audio.paused) { audio.pause(); return; }
    message.textContent = '';
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    try { await audio.play(); }
    catch { message.textContent = 'Signal unavailable. Try again.'; updateState(); }
  });
  audio.addEventListener('play', () => {
    players.forEach(other => { if (other !== player) other.querySelector('audio').pause(); });
    updateState();
  });
  ['pause', 'ended'].forEach(event => audio.addEventListener(event, updateState));
  ['loadedmetadata', 'durationchange', 'timeupdate'].forEach(event => audio.addEventListener(event, sync));
  audio.addEventListener('waiting', () => { state.textContent = 'BUFFERING'; });
  audio.addEventListener('playing', updateState);
  audio.addEventListener('error', () => {
    updateState();
    state.textContent = 'SIGNAL LOST';
    message.textContent = 'Audio could not be loaded. Press play to retry.';
  });
  seek.addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) { audio.currentTime = Number(seek.value); sync(); }
  });
  sync();
});
