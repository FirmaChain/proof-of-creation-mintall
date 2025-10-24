export const initSmoothScroll = () => {
  // Handle initial page load with hash
  if (window.location.hash) {
    setTimeout(() => {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Height of fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  // Handle click events on hash links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.href && link.href.includes('#')) {
      const url = new URL(link.href);

      // Only handle internal hash links
      if (url.hostname === window.location.hostname && url.pathname === window.location.pathname) {
        const hash = url.hash.slice(1);
        const element = document.getElementById(hash);

        if (element) {
          e.preventDefault();

          // Update URL without jumping
          window.history.pushState(null, '', `#${hash}`);

          // Smooth scroll to element
          const offset = 80; // Height of fixed header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    }
  });
};

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
});