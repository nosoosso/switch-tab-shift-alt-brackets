window.addEventListener('keydown', function (e) {
  browser.runtime.sendMessage({
    type: 'keydown',
    keyCode: e.keyCode,
  });
});

window.addEventListener('keyup', function (e) {
  browser.runtime.sendMessage({
    type: 'keyup',
    keyCode: e.keyCode,
  });
});
