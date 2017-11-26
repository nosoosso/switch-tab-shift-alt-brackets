browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(message) {
  switch (message) {
    case 'previousTab': {
      previousTab();
      break;
    }
    case 'nextTab': {
      nextTab();
      break;
    }
    default: {
    }
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