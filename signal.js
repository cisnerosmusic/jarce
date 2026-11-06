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
const albumMode = players.length > 1;
document.querySelectorAll('.inline-lyrics').forEach(details => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    const current = details.closest('.transmission').querySelector('audio');
    players.forEach(player => {
      const audio = player.querySelector('audio');
      if (audio !== current) audio.pause();
    });
  });
});
async function startTrack(player) {
  const audio = player.querySelector('audio');
  audio.currentTime = 0;
  try { await audio.play(); }
  catch { player.querySelector('.deck-message').textContent = 'Press play to continue.'; }
}
const formatTime = value => Number.isFinite(value) && value >= 0
  ? Math.floor(value / 60) + ':' + String(Math.floor(value % 60)).padStart(2, '0') : '--:--';

players.forEach(player => {
  const audio = player.querySelector('audio');
  const title = player.dataset.title;
  const poster = player.closest('.song-art')?.querySelector('.poster-link');
  if (poster && audio.getAttribute('src')?.endsWith('/01_lonely_vending_machine.mp3')) {
    const motion = document.createElement('video');
    motion.className = 'motion-poster';
    motion.muted = true;
    motion.loop = true;
    motion.playsInline = true;
    motion.preload = 'none';
    motion.setAttribute('aria-hidden', 'true');
    motion.tabIndex = -1;
    poster.append(motion);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      motion.pause();
      poster.classList.remove('motion-visible');
    };
    const playMotion = async () => {
      if (audio.paused || audio.ended || document.hidden || reducedMotion.matches) return;
      if (!motion.getAttribute('src')) motion.src = '/assets/video/01-lonely-vending-machine.mp4';
      try {
        await motion.play();
        if (audio.paused || document.hidden || reducedMotion.matches) stopMotion();
        else poster.classList.add('motion-visible');
      } catch { poster.classList.remove('motion-visible'); }
    };
    audio.addEventListener('playing', playMotion);
    audio.addEventListener('pause', stopMotion);
    audio.addEventListener('waiting', stopMotion);
    audio.addEventListener('ended', () => {
      stopMotion();
      poster.classList.remove('motion-visible');
    });
    motion.addEventListener('error', () => poster.classList.remove('motion-visible'));
    document.addEventListener('visibilitychange', () => document.hidden ? stopMotion() : playMotion());
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        stopMotion();
        poster.classList.remove('motion-visible');
      } else playMotion();
    });
  }
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
  const navigation = document.createElement('nav');
  navigation.className = 'track-controls';
  navigation.setAttribute('aria-label', 'Playback navigation');
  if (albumMode) {
    const index = players.indexOf(player);
    for (const [step, label] of [[-1, '← Previous'], [1, 'Next →']]) {
      const control = document.createElement('button');
      control.type = 'button';
      control.textContent = label;
      control.disabled = !players[index + step];
      control.addEventListener('click', () => startTrack(players[index + step]));
      navigation.append(control);
    }
  } else {
    document.querySelectorAll('nav[aria-label="Track navigation"] a').forEach(link => {
      navigation.append(link.cloneNode(true));
    });
  }
  player.append(navigation);
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
    announce(player);
    const nextAudio = players[players.indexOf(player) + 1]?.querySelector('audio');
    if (nextAudio && nextAudio.preload !== 'auto') {
      nextAudio.preload = 'auto';
      nextAudio.load();
    }
  });
  ['pause', 'ended'].forEach(event => audio.addEventListener(event, updateState));
  // Album listening: when a track ends on a page with several players, the next one starts.
  audio.addEventListener('ended', () => {
    const next = players[players.indexOf(player) + 1];
    if (next) startTrack(next);
  });
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

// Lock screen, headphones and car controls (Media Session API).
function announce(player) {
  if (!('mediaSession' in navigator)) return;
  const audio = player.querySelector('audio');
  const art = player.closest('.song-art')?.querySelector('img');
  const index = players.indexOf(player);
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: player.dataset.title,
      artist: player.dataset.artist || 'JARCE',
      album: 'THE LAST CHANCE MACHINE',
      artwork: art ? [{ src: art.currentSrc || art.src, sizes: '1024x1536', type: 'image/webp' }] : []
    });
    const ms = navigator.mediaSession;
    const go = step => () => startTrack(players[index + step]);
    ms.setActionHandler('play', () => audio.play());
    ms.setActionHandler('pause', () => audio.pause());
    ms.setActionHandler('seekbackward', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
    ms.setActionHandler('seekforward', () => { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); });
    ms.setActionHandler('seekto', d => { if (Number.isFinite(d.seekTime)) audio.currentTime = d.seekTime; });
    ms.setActionHandler('previoustrack', index > 0 ? go(-1) : null);
    ms.setActionHandler('nexttrack', index < players.length - 1 ? go(1) : null);
  } catch { /* Media Session is an enhancement; playback works without it. */ }
}

// Full poster viewer: stays inside the page, so the installed app never loses its way back.
const posterLinks = [...document.querySelectorAll('.poster-link')];
if (posterLinks.length && typeof HTMLDialogElement === 'function') {
  const viewer = document.createElement('dialog');
  viewer.className = 'poster-viewer';
  viewer.setAttribute('aria-label', 'Full poster');
  viewer.innerHTML = '<button type="button" class="poster-close" aria-label="Close poster">CLOSE ✕</button><img alt="">';
  document.body.append(viewer);
  const big = viewer.querySelector('img');
  const close = () => { if (viewer.open) viewer.close(); };
  let fromHistory = false;
  posterLinks.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const thumb = link.querySelector('img');
    big.src = link.href;
    big.alt = thumb?.alt || '';
    viewer.showModal();
    history.pushState({ poster: true }, '');
  }));
  viewer.querySelector('.poster-close').addEventListener('click', close);
  viewer.addEventListener('click', event => { if (event.target === viewer || event.target === big) close(); });
  // Android back button / browser back closes the viewer instead of leaving the page.
  window.addEventListener('popstate', () => { if (viewer.open) { fromHistory = true; close(); } });
  viewer.addEventListener('close', () => {
    if (!fromHistory && history.state?.poster) history.back();
    fromHistory = false;
    big.removeAttribute('src');
  });
}
