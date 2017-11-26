const KEY_SHIFT = 16;
const KEY_ALT = 18;
const KEY_OPENING_BRACKET = 219; // [
const KEY_CLOSING_BRACKET = 221; // ]


const keyConfigs = [{
  keys: [KEY_SHIFT, KEY_ALT, KEY_OPENING_BRACKET],
  action: 'previousTab',
}, {
  keys: [KEY_SHIFT, KEY_ALT, KEY_CLOSING_BRACKET],
  action: 'nextTab',
}];


const activeKeyMap = {};

function setKeyDown(keyCode) {
  activeKeyMap[keyCode] = true;
}

function setKeyUp(keyCode) {
  activeKeyMap[keyCode] = false;
}

function doAction(activeKeyMap, keyConfigs) {
  const matchedConfig = keyConfigs.find((conf) => {
    return conf.keys.every((keyCode) => {
      return activeKeyMap[keyCode] === true;
    });
  });

  if(matchedConfig){
    browser.runtime.sendMessage(matchedConfig.action);
  }
}

window.addEventListener('keydown', function (e) {
  setKeyDown(e.keyCode);

  doAction(activeKeyMap, keyConfigs);
});

window.addEventListener('keyup', function (e) {
  setKeyUp(e.keyCode);
})

console.log('apoeijfa')