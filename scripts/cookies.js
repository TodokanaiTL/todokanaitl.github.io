function __cookiePolicy(style) {
  document.getElementById('cookies').style.display = style;
}
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
  if(window.location.hash === '#cookies') __cookiePolicy('block');
});
window.addEventListener('hashchange', function() {
  if(window.location.hash === '#cookies') {
    __cookiePolicy('block');
  } else {
    __cookiePolicy('none');
  }
});

