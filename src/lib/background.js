const KEY_SHIFT = 16;
const KEY_ALT = 18;
const KEY_OPENING_BRACKET = 219; // [
const KEY_CLOSING_BRACKET = 221; // ]


const keyConfigs = [{
  keys: [KEY_SHIFT, KEY_ALT, KEY_OPENING_BRACKET],
  action: previousTab,
}, {
  keys: [KEY_SHIFT, KEY_ALT, KEY_CLOSING_BRACKET],
  action: nextTab,
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

  if (matchedConfig) {
    matchedConfig.action();
  }
}

function previousTab() {
  browser.tabs.query({
    currentWindow: true,
  })
    .then((tabs) => {
      const activeTab = tabs.find(tab => tab.active === true);
      const previousIndex = activeTab.index === 0 ? tabs.length - 1 : activeTab.index - 1;

      return browser.tabs.query({
        currentWindow: true,
        index: previousIndex,
      });
    })
    .then(([tab]) => {
      return browser.tabs.update(tab.id, {
        active: true,
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function nextTab() {
  browser.tabs.query({
    currentWindow: true,
  })
    .then((tabs) => {
      const activeTab = tabs.find(tab => tab.active === true);
      const nextIndex = activeTab.index === tabs.length - 1 ? 0 : activeTab.index + 1;

      return browser.tabs.query({
        currentWindow: true,
        index: nextIndex,
      });
    })
    .then(([tab]) => {
      return browser.tabs.update(tab.id, {
        active: true,
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleMessage(message) {
  switch (message.type) {
    case 'keydown': {
      setKeyDown(message.keyCode);
      doAction(activeKeyMap, keyConfigs);
      break;
    }
    case 'keyup': {
      setKeyUp(message.keyCode);
      break;
    }
    default: {
    }
  }
}


browser.runtime.onMessage.addListener(handleMessage);