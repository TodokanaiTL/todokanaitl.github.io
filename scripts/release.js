/* eslint-disable no-var, one-var, no-undef */
(function() {
  var patch = {};
  var storedData = JSON.parse(localStorage.getItem('wa2patch'));
  var opts = {
    headers: {
      'User-Agent': 'todokanaitl.github.io'
    }
  };
  if(storedData) opts.headers['If-None-Match'] = storedData.etag;
  var url = 'https://api.github.com/repos/' +
    'TodokanaiTL/WA2EnglishPatch/releases/latest';
  var latest = document.getElementsByTagName('h3')[1];
  function createLink(asset, _name) {
    var link = document.createElement('a');
    link.href = asset.browser_download_url;
    link.download = asset.name;
    link.type = asset.content_type;
    link.target = '#null';
    link.rel = 'noopener';
    link.innerHTML = _name || link.href.split('/').slice(-2)[0];
    return link;
  }
  fetch(url, opts).then(function(res) { return res })
    .then(function(res) {
      patch.etag = res.headers.get('etag');
      return (res.status === 304) ? storedData : res.json();
    }).then(function(data) {
      latest.appendChild(createLink(data.assets[0]));
      var ul = document.getElementById('release-notes');
      data.body.split('\r\n').forEach(function(e) {
        var li = document.createElement('li');
        li.innerHTML = e.replace(/- /, '');
        ul.appendChild(li);
      });
      var dmm = document.getElementById('dmm');
      var link = createLink(data.assets[1], 'DMM Patch');
      dmm.replaceChild(link, dmm.children[2]);
      patch.body = data.body;
      patch.assets = data.assets.slice(0, 2);
      localStorage.setItem('wa2patch', JSON.stringify(patch));
    }).catch(function(err) {
      console.error(err);
      latest.innerHTML = '<a href="https://git.io/fNvbt" rel=' +
        '"noopener" target="#null">Download WA2_patch.exe</a>';
    });
})();

