/* ============================================================================
   INSTANT TOOLS HUB — Main Shared JavaScript
   ============================================================================ */

// Copy text with fallback to clipboard API
function copyText(text, buttonElement = null) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard');
      if (buttonElement) {
        buttonElement.textContent = 'Copied!';
        setTimeout(() => {
          buttonElement.textContent = 'Copy';
        }, 2000);
      }
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Copied to clipboard');
  } catch (err) {
    console.error('Copy failed:', err);
  }
  document.body.removeChild(textarea);
}

// Show toast notification
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize navigation
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = mobileNav?.querySelectorAll('a');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  mobileNavLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initNav);

// Utility: Format large numbers
function formatNumber(num) {
  return num.toLocaleString();
}

// Utility: Get URL parameters
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Utility: Random from array
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Utility: Get random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Secure random number generator
function getSecureRandomNumber(min, max) {
  const range = max - min + 1;
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  return (randomArray[0] % range) + min;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
