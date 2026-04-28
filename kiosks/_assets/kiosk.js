// Hides the kiosk loading overlay once the embedded dashboard is interactive.
// Falls back to a hard timeout in case the iframe never fires `load`.
(function () {
  const frame = document.getElementById('k-frame');
  const loader = document.getElementById('k-loading');
  if (!frame || !loader) return;

  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 400);
  };

  frame.addEventListener('load', () => {
    // The embedded bundle replaces its documentElement after load, so wait
    // a beat for first paint before fading the kiosk loader.
    setTimeout(hide, 450);
  });

  // Hard fallback if `load` never resolves (e.g. SW caching weirdness).
  setTimeout(hide, 8000);
})();
