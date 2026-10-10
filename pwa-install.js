(function () {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    const button = document.createElement('button');
    button.textContent = 'Instalar aplicativo';
    button.id = 'install-pwa';
    button.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;padding:12px 16px;border:0;border-radius:999px;background:#0b5ed7;color:#fff;font-weight:700;box-shadow:0 4px 14px #0005;';
    button.addEventListener('click', async () => {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      button.remove();
    });
    document.body.appendChild(button);
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
  }
})();
