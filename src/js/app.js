import DOMInteraction from './domInteraction';

window.addEventListener('load', () => {
  const domInteraction = new DOMInteraction();
  domInteraction.setListeners();

  let draggedItem = null;
  let selectedItem = null;
  let startX = 0;
  let startY = 0;

  document.addEventListener('mousedown', (e) => {
    const target = e.target.closest('.card');
    if (!target) {
      return;
    }

    selectedItem = target;
    selectedItem.classList.add('list__item_selected');

    draggedItem = target.cloneNode(true);
    draggedItem.classList.add('list__item_dragged');

    const width = selectedItem.clientWidth;
    const height = selectedItem.clientHeight;
    const rect = selectedItem.getBoundingClientRect();

    const left = rect.left + 0;
    const top = rect.top + 0;
    startX = e.clientX;
    startY = e.clientY;

    draggedItem.style.width = `${width}px`;
    draggedItem.style.height = `${height}px`;
    draggedItem.style.top = `${top}px`;
    draggedItem.style.left = `${left}px`;

    if (!e.target.classList.contains('close')) {
      document.querySelector('.base').appendChild(draggedItem);
    }
  });

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (!selectedItem) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    const rect = selectedItem.getBoundingClientRect();

    const left = rect.left + 0 + e.clientX - startX;
    const top = rect.top + 0 + e.clientY - startY;

    draggedItem.style.top = `${top}px`;
    draggedItem.style.left = `${left}px`;
  });

  document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    if (!selectedItem) {
      return;
    }

    document.body.style.cursor = 'default';

    const x = e.clientX;
    const y = e.clientY;

    draggedItem.style.display = 'none';
    const changingItem = document.elementFromPoint(x, y);
    const parent = changingItem.closest('.board-list');

    try {
      if (changingItem && !changingItem.classList.contains('list-title') && parent) {
        parent.insertBefore(selectedItem, changingItem);
      }
    } catch (error) {
      // no action required
    }

    selectedItem.classList.remove('list__item_selected');
    selectedItem = null;

    draggedItem.remove();
    draggedItem = null;
  });

  document.addEventListener('mouseleave', () => {
    if (!selectedItem) {
      return;
    }

    selectedItem.classList.remove('list__item_selected');
    selectedItem = null;

    draggedItem.remove();
    draggedItem = null;
  });
});
