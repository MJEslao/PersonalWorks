(function () {
  const container = document.getElementById('pjax-container');
  if (!container) return;

  const TRANSITION_MS = 260;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function isModifiedEvent(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  function isSameOrigin(url) {
    return url.origin === window.location.origin;
  }

  function shouldHandleLink(link, event) {
    if (!link) return false;
    if (event.defaultPrevented) return false;
    if (event.button !== 0) return false;
    if (isModifiedEvent(event)) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (!link.hasAttribute('data-pjax')) return false;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return false;

    const url = new URL(link.href, window.location.href);

    if (!isSameOrigin(url)) return false;
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

    return true;
  }

  function updateActiveNav(pathname) {
    document.querySelectorAll('#header nav a[data-pjax]').forEach((anchor) => {
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname === pathname) anchor.classList.add('active');
      else anchor.classList.remove('active');
    });
  }

  async function fetchPartial(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-PJAX': 'true',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return response.text();
  }

  async function navigate(url, push = true) {
    try {
      document.body.classList.add('is-pjax-loading');
      container.classList.add('is-leaving');

      await sleep(TRANSITION_MS);

      const html = await fetchPartial(url);

      const temp = document.createElement('div');
      temp.innerHTML = html;

      const next = temp.querySelector('#pjax-container');

      if (!next) {
        window.location.href = url;
        return;
      }

      container.classList.remove('is-leaving');
      container.classList.add('is-entering');
      container.innerHTML = next.innerHTML;

      const nextTitle = next.getAttribute('data-page-title');
      if (nextTitle) {
        document.title = nextTitle;
      }

      const nextUrl = new URL(url, window.location.href);

      if (push) {
        history.pushState({}, '', nextUrl.pathname + nextUrl.search + nextUrl.hash);
      }

      updateActiveNav(nextUrl.pathname);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.remove('is-entering');
          document.body.classList.remove('is-pjax-loading');
        });
      });
    } catch (err) {
      console.error('PJAX navigation failed:', err);
      window.location.href = url;
    }
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!shouldHandleLink(link, event)) return;

    event.preventDefault();
    navigate(link.href, true);
  });

  window.addEventListener('popstate', function () {
    navigate(window.location.href, false);
  });

  updateActiveNav(window.location.pathname);
})();