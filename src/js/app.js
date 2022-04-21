import DOMInteraction from './domInteraction';

window.addEventListener('load', () => {
  const domInteraction = new DOMInteraction();
  domInteraction.setListeners();

  let draggedItem = null;
  let selectedItem = null;
  let startX = 0;
  let startY = 0;

  document.addEventListener('mousedown', e => {
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
    const { scrollX, scrollY } = document.body;
    const left = rect.left + 0;
    const top = rect.top + 0;
    startX = e.clientX;
    startY = e.clientY;

    draggedItem.style.width = `${width}px`;
    draggedItem.style.height = `${height}px`;
    draggedItem.style.top = `${top}px`;
    draggedItem.style.left = `${left}px`;

    document.body.appendChild(draggedItem);
  });

  document.addEventListener('mousemove', e => {
    if (!selectedItem) {
      return;
    }
    const width = selectedItem.clientWidth;
    const height = selectedItem.clientHeight;
    const rect = selectedItem.getBoundingClientRect();
    const { scrollX, scrollY } = document.body;
    const left = rect.left + 0 + e.clientX - startX;
    const top = rect.top + 0 + e.clientY - startY;

    draggedItem.style.top = `${top}px`;
    draggedItem.style.left = `${left}px`;
  });

  document.addEventListener('mouseup', e => {
    if (!selectedItem) {
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    draggedItem.style.display = 'none';
    const changingItem = document.elementFromPoint(x, y);
    const parent = changingItem.closest('.card');

    if (changingItem && parent) {
      parent.insertBefore(selectedItem, changingItem);
    }

    selectedItem.classList.remove('list__item_selected');
    selectedItem = null;

    draggedItem.remove();
    draggedItem = null;
  });
});
