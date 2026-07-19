document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('add-to-cart');
  const counter = document.getElementById('cart-count');
  const storageKey = 'cart-count';
  const MAX_QUANTITY = 100;

  const getStoredCount = () => {
    try {
      const rawValue = localStorage.getItem(storageKey);
      if (!rawValue) {
        return 0;
      }

      const parsedValue = JSON.parse(rawValue);
      if (parsedValue && typeof parsedValue === 'object' && typeof parsedValue.count !== 'undefined') {
        return Math.max(0, Number.parseInt(parsedValue.count, 10) || 0);
      }

      return Math.max(0, Number.parseInt(parsedValue, 10) || 0);
    } catch (error) {
      console.warn('Unable to read cart count from storage:', error);
      return 0;
    }
  };

  const saveStoredCount = (nextCount) => {
    try {
      const safeCount = Math.max(0, Math.min(MAX_QUANTITY, Number(nextCount) || 0));
      localStorage.setItem(storageKey, JSON.stringify({ count: safeCount }));
    } catch (error) {
      console.warn('Unable to save cart count to storage:', error);
    }
  };

  let count = getStoredCount();

  const updateCounter = () => {
    if (counter) {
      counter.textContent = `Saved items: ${count}`;
    }
  };

  updateCounter();

  if (button) {
    button.addEventListener('click', () => {
      count = Math.min(MAX_QUANTITY, count + 1);
      saveStoredCount(count);
      updateCounter();

      const originalLabel = button.textContent;
      button.textContent = 'Added';
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1000);
    });
  }
});
