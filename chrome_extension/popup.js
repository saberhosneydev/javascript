// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function clicked(){
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			chrome.tabs.executeScript(tabs[i].id, {file: "change.js"});
		}
	});
}
document.addEventListener('DOMContentLoaded', function () {
	var btn = document.querySelector('#clickBTN');
	btn.addEventListener('click', clicked);
});
