// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function performLogic(){
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			chrome.tabs.executeScript(tabs[i].id, {file: 'change.js'});
        }

    });
}
chrome.contextMenus.create({
    id: "PreparePorn",
    title: "PreparePorn",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "downloadStory",
    title: "Download Story",
    parentId: "PreparePorn",
    contexts: ["all"]
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "PreparePorn") {
        performLogic();
    }
    if (info.menuItemId == "downloadStory") {
        console.log(tab.url);
        if (tab.url.includes("facebook.com")) {
            chrome.tabs.executeScript({
                file: 'content_scripts/facebook.js'
            });
        }
        if (tab.url.includes("instagram.com/stories/")) {
            chrome.tabs.executeScript({
                file: 'content_scripts/instagram.js'
            });
        }
    }

});
chrome.runtime.onMessage.addListener(function (message, sender) {
    let date = new Date ();
    let dateString = date.getFullYear () + "-" + date.getMonth () + "-" + date.getDay ();
    let fileExtension = message.url.split ("?")[0].split (".").pop ();

    chrome.downloads.download ({
        url: message.url,
        filename: message.username + "'s " + message.site + " " + dateString + " story" + "." + fileExtension,
        saveAs: true
    });
});
