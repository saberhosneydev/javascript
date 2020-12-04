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

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "PreparePorn") {
        performLogic();
    }
});
