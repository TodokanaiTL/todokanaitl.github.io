/* eslint-disable no-var, one-var, no-undef */
(function(storedData) {
  var patch = {};
  var headers = {
    'Accept': 'application/json',
    'User-Agent': 'todokanaitl.github.io'
  };
  if (storedData) headers['If-None-Match'] = storedData.etag;
  var url = 'https://api.github.com/repos/' +
    'TodokanaiTL/WA2EnglishPatch/releases/latest';
  var latest = document.getElementsByTagName('h3')[1];
  var link = latest.firstElementChild.innerHTML;
  fetch(url, {headers}).then(function(res) {
    patch.etag = res.headers.get('etag');
    return res.status === 304 ? storedData : res.json();
  }).then(function(data) {
    latest.innerHTML = link;
    var ul = document.getElementById('release-notes');
    latest.firstElementChild.innerText = data.name;
    data.body.split('\n').forEach(function(e) {
      var li = document.createElement('li');
      li.innerHTML = e.replace(/^[*-] /, '');
      ul.appendChild(li);
    });
    patch.name = data.name;
    patch.body = data.body;
    localStorage.setItem('wa2patch', JSON.stringify(patch));
  }).catch(function(err) {
    console.error(err);
    latest.innerHTML = link;
  });
})(JSON.parse(localStorage.getItem('wa2patch')));
