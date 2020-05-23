function isAmazonProductUrl(url) {
  return url && url.indexOf("amazon") > -1 && url.indexOf("/dp") > -1;
}

function isUrlAlreadyUpdated(url) {
  return url.indexOf("ntap_updated=true") > -1;
}

chrome.browserAction.onClicked.addListener(tab => {
  if (isAmazonProductUrl(tab.url)) {
    const nextToAPersonURL = `https://nexttoaperson.com/ntap?url=${encodeURIComponent(
      tab.url
    )}`;
    chrome.tabs.create({ url: nextToAPersonURL });
  } else {
    alert("Not an Amazon product URL!");
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || tab.url;
  if (!isAmazonProductUrl(url) || isUrlAlreadyUpdated(url)) {
    return;
  }

  fetch(
    "https://us-central1-jvmartins-projects.cloudfunctions.net/amazonNextTAP",
    {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let newUrl = `${url}?tag=nexttoaperson-21&ntap_updated=true`;
  if (url.indexOf("?") > -1) {
    newUrl = `${url}&tag=nexttoaperson-21&ntap_updated=true`;
  }
  chrome.tabs.update(tabId, { url: newUrl });
});
