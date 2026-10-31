'use strict';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
let installPrompt;
const installButton = document.getElementById('install-app');
window.addEventListener('beforeinstallprompt', event => {
  if (!installButton || window.matchMedia('(display-mode: standalone)').matches) return;
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});
installButton?.addEventListener('click', async () => {
  if (!installPrompt) return;
  const prompt = installPrompt;
  installPrompt = null;
  installButton.hidden = true;
  try { await prompt.prompt(); await prompt.userChoice; } catch {}
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  if (installButton) installButton.hidden = true;
});
