window.addEventListener('load', function() {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#252e39'
      },
      button: {
        background: '#14A7D0'
      }
    },
    theme: 'classic',
    position: 'bottom-right',
    content: {
      message: 'This website uses cookies to ensure you get the best' +
      ' experience. We don\'t store any of your personal information.',
      href: '#cookies'
    },
    elements: {
      messagelink: '<span id="cookieconsent:desc" class="cc-message">' +
      '{{message}} <a aria-label="learn more" tabindex="0" ' +
      'href="{{href}}" class="cc-link">{{link}}</a></span>'
    }
  });
  if (window.location.hash === '#cookies')
    document.getElementById('cookies').style.display = 'block'
});

window.addEventListener('hashchange', function() {
  document.getElementById('cookies').style.display =
    window.location.hash === '#cookies' ? 'block' : 'none';
});
