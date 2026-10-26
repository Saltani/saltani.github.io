(() => {
  const dialog = document.querySelector('.art-dialog');
  const image = dialog.querySelector('img');
  const title = dialog.querySelector('.dialog-footer p');
  const buttons = [...document.querySelectorAll('[data-artwork]')];
  let current = 0;
  let opener;

  function show(index) {
    current = (index + buttons.length) % buttons.length;
    const figure = buttons[current].closest('figure');
    const thumbnail = figure.querySelector('img');
    image.src = thumbnail.currentSrc || thumbnail.src;
    image.alt = thumbnail.alt;
    title.textContent = figure.querySelector('figcaption').textContent;
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => {
    opener = button;
    show(index);
    dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.dialog-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.dialog-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('close', () => opener?.focus());
})();
